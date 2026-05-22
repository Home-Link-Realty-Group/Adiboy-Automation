# productivityhub

Source: productivityhub.docx

// ProductivityHub — task & calendar manager

import { useState, useEffect } from 'react';

import { EnterpriseTask, FollowUp, Lead, Deal, DocumentUpload as DocEntity, TaskList as TaskListEntity } from '@/api/entities';

import { format } from 'date-fns';

import CalendarView from '@/components/ProductivityHub/CalendarView';

import WeekPlanner from '@/components/ProductivityHub/WeekPlanner';

import Analytics from '@/components/ProductivityHub/Analytics';

import TimeTracking from '@/components/ProductivityHub/TimeTracking';

import KanbanBoard from '@/components/ProductivityHub/KanbanBoard';

import GoalsAndHabits from '@/components/ProductivityHub/GoalsAndHabits';

import ListsManager from '@/components/ProductivityHub/ListsManager';

import DocumentUpload from '@/components/ProductivityHub/DocumentUpload';

import SaaSLayout from '@/components/saas/SaaSLayout';

import { Calendar as CalendarIcon } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#27ae60';

const RED = '#ef4444';

const PRIORITY_COLORS = { critical: '#ef4444', high: '#f97316', medium: '#3b82f6', low: '#6b7280' };

const VIEWS = [

  { id: 'dashboard', label: '📊 Dashboard' },

  { id: 'tasks', label: '✅ Tasks' },

  { id: 'calendar', label: '📅 Calendar' },

  { id: 'week', label: '📆 Week' },

  { id: 'kanban', label: '🎯 Board' },

  { id: 'lists', label: '📋 Lists' },

  { id: 'goals', label: '🏆 Goals' },

  { id: 'analytics', label: '📈 Analytics' },

];

export default function ProductivityHub() {

  const [activeView, setActiveView] = useState('dashboard');

  const [tasks, setTasks] = useState([]);

  const [followUps, setFollowUps] = useState([]);

  const [leads, setLeads] = useState([]);

  const [deals, setDeals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showTaskModal, setShowTaskModal] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [filterStatus, setFilterStatus] = useState('all');

  const [filterPriority, setFilterPriority] = useState('all');

  const [search, setSearch] = useState('');

  const [selectedListFilter, setSelectedListFilter] = useState(null);

  const [taskDocs, setTaskDocs] = useState({});

  useEffect(() => { loadAllData(); }, []);

  async function loadAllData() {

    try {

      const [t, fu, l, d] = await Promise.all([

        EnterpriseTask.list('-scheduled_date', 500),

        FollowUp.list(),

        Lead.list('-created_date', 200),

        Deal.list(),

      ]);

      setTasks(t || []);

      setFollowUps(fu || []);

      setLeads(l || []);

      setDeals(d || []);

    } catch (e) { console.error(e); }

    setLoading(false);

  }

  async function saveTask(data) {

    if (editingTask) {

      await EnterpriseTask.update(editingTask.id, data);

    } else {

      await EnterpriseTask.create(data);

    }

    setShowTaskModal(false);

    setEditingTask(null);

    loadAllData();

  }

  async function toggleTask(task) {

    const newStatus = task.status === 'completed' ? 'planned' : 'completed';

    await EnterpriseTask.update(task.id, { status: newStatus, completed_at: newStatus === 'completed' ? new Date().toISOString() : '' });

    loadAllData();

  }

  async function deleteTask(id) {

    if (confirm('Delete this task?')) {

      await EnterpriseTask.delete(id);

      loadAllData();

    }

  }

  const today = format(new Date(), 'yyyy-MM-dd');

  const todayTasks = tasks.filter(t => t.scheduled_date === today);

  const overdueTasks = tasks.filter(t => t.scheduled_date < today && t.status !== 'completed');

  const completedToday = tasks.filter(t => t.scheduled_date === today && t.status === 'completed');

  const filteredTasks = tasks.filter(t => {

    const matchStatus = filterStatus === 'all' || t.status === filterStatus;

    const matchPriority = filterPriority === 'all' || t.priority === filterPriority;

    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchPriority && matchSearch;

  });

  if (loading) {

    return (

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f0f2f5', fontFamily: 'Segoe UI, Arial, sans-serif' }}>

        <div style={{ textAlign: 'center' }}>

          <div style={{ fontSize: 52, marginBottom: 12 }}>🚀</div>

          <div style={{ fontSize: 18, fontWeight: 700, color: NAVY }}>Loading Productivity Hub...</div>

        </div>

      </div>

    );

  }

  return (

    <SaaSLayout

      title="Productivity Hub"

      subtitle="Calendar · Tasks · Kanban · Goals · Analytics — all in one Fortune-500 workspace"

      icon={CalendarIcon}

      accent="#f59e0b"

      headerRight={

        <button

          onClick={() => { setEditingTask(null); setShowTaskModal(true); }}

          style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}

        >

          ➕ New Task

        </button>

      }

    >

      {/* View Tabs + Stats */}

      <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>

          {VIEWS.map(view => (

            <button

              key={view.id}

              onClick={() => setActiveView(view.id)}

              style={{

                padding: '8px 14px',

                background: activeView === view.id ? GOLD : '#f1f5f9',

                color: activeView === view.id ? '#fff' : NAVY,

                border: 'none',

                borderRadius: 8,

                fontWeight: activeView === view.id ? 800 : 600,

                cursor: 'pointer',

                fontSize: 12,

              }}

            >

              {view.label}

            </button>

          ))}

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8 }}>

          {[

            { label: 'Today', value: todayTasks.length, icon: '⚡', color: '#3b82f6' },

            { label: 'Done', value: completedToday.length, icon: '✅', color: GREEN },

            { label: 'Overdue', value: overdueTasks.length, icon: '🚨', color: RED },

            { label: 'Total', value: tasks.length, icon: '📋', color: NAVY },

            { label: 'Leads', value: leads.filter(l => !['Dead','Closed','Inactive'].includes(l.status)).length, icon: '👥', color: '#8b5cf6' },

            { label: 'Deals', value: deals.filter(d => d.status !== 'Closed').length, icon: '💼', color: GOLD },

          ].map(s => (

            <div key={s.label} style={{ background: '#f8fafc', borderRadius: 8, padding: '10px', textAlign: 'center', borderTop: `3px solid ${s.color}` }}>

              <div style={{ fontSize: 14 }}>{s.icon}</div>

              <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</div>

              <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase', marginTop: 2, fontWeight: 700 }}>{s.label}</div>

            </div>

          ))}

        </div>

      </div>

      {/* Main */}

      <div>

        {/* DASHBOARD */}

        {activeView === 'dashboard' && (

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 380px', gap: 20 }}>

            <div style={{ gridColumn: '1 / 3' }}>

              <TaskList

                tasks={todayTasks}

                title="⚡ Today's Tasks"

                onEdit={task => { setEditingTask(task); setShowTaskModal(true); }}

                onToggle={toggleTask}

                onDelete={deleteTask}

              />

              {overdueTasks.length > 0 && (

                <div style={{ marginTop: 20 }}>

                  <TaskList

                    tasks={overdueTasks}

                    title="🚨 Overdue"

                    onEdit={task => { setEditingTask(task); setShowTaskModal(true); }}

                    onToggle={toggleTask}

                    onDelete={deleteTask}

                    danger

                  />

                </div>

              )}

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <TimeTracking tasks={todayTasks} />

              <GoalsAndHabits />

            </div>

          </div>

        )}

        {/* TASKS VIEW */}

        {activeView === 'tasks' && (

          <div>

            <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>

              <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>

                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#888' }}>🔍</span>

                <input

                  placeholder="Search tasks..."

                  value={search}

                  onChange={e => setSearch(e.target.value)}

                  style={{ width: '100%', padding: '10px 10px 10px 32px', border: '1px solid #ddd', borderRadius: 8, boxSizing: 'border-box' }}

                />

              </div>

              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: 8 }}>

                <option value="all">All Status</option>

                <option value="planned">📌 Planned</option>

                <option value="in_progress">🔄 In Progress</option>

                <option value="completed">✅ Completed</option>

                <option value="blocked">🚫 Blocked</option>

              </select>

              <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: 8 }}>

                <option value="all">All Priority</option>

                <option value="critical">🔴 Critical</option>

                <option value="high">🟠 High</option>

                <option value="medium">🔵 Medium</option>

                <option value="low">🟢 Low</option>

              </select>

            </div>

            <TaskList

              tasks={filteredTasks}

              title={`All Tasks (${filteredTasks.length})`}

              onEdit={task => { setEditingTask(task); setShowTaskModal(true); }}

              onToggle={toggleTask}

              onDelete={deleteTask}

              showDocs

            />

          </div>

        )}

        {activeView === 'calendar' && <CalendarView tasks={tasks} followUps={followUps} selectedDate={selectedDate} onDateChange={setSelectedDate} />}

        {activeView === 'week' && <WeekPlanner tasks={tasks} followUps={followUps} selectedDate={selectedDate} />}

        {activeView === 'kanban' && <KanbanBoard tasks={tasks} onTasksChange={loadAllData} />}

        {activeView === 'lists' && <ListsManager onSelectList={(list) => { setSelectedListFilter(list); setActiveView('tasks'); }} />}

        {activeView === 'goals' && <GoalsAndHabits />}

        {activeView === 'analytics' && <Analytics tasks={tasks} deals={deals} leads={leads} followUps={followUps} />}

      </div>

      {showTaskModal && (

        <TaskModal

          task={editingTask}

          defaultDate={format(selectedDate, 'yyyy-MM-dd')}

          onSave={saveTask}

          onClose={() => { setShowTaskModal(false); setEditingTask(null); }}

        />

      )}

    </SaaSLayout>

  );

}

// ─── TASK LIST COMPONENT ──────────────────────────────────────────────────────

function TaskList({ tasks, title, onEdit, onToggle, onDelete, danger, showDocs }) {

  const [expandedDoc, setExpandedDoc] = useState(null);

  const [docsByTask, setDocsByTask] = useState({});

  async function loadDocs(taskId) {

    if (docsByTask[taskId]) {

      setExpandedDoc(expandedDoc === taskId ? null : taskId);

      return;

    }

    const docs = await DocEntity.filter({ task_id: taskId });

    setDocsByTask(prev => ({ ...prev, [taskId]: docs || [] }));

    setExpandedDoc(taskId);

  }

  return (

    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

      <div style={{ background: danger ? '#fff5f5' : '#f9fafb', padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 8 }}>

        <span style={{ fontWeight: 800, fontSize: 15, color: danger ? RED : NAVY }}>{title}</span>

        <span style={{ background: danger ? RED : GOLD, color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{tasks.length}</span>

      </div>

      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 600, overflowY: 'auto' }}>

        {tasks.length === 0 && (

          <div style={{ textAlign: 'center', padding: '32px', color: '#aaa' }}>

            <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>

            <div>All clear!</div>

          </div>

        )}

        {tasks.map(task => (

          <div key={task.id}>

            <div

              style={{

                display: 'flex',

                alignItems: 'center',

                gap: 10,

                padding: '10px 12px',

                border: `1.5px solid ${PRIORITY_COLORS[task.priority] || '#ddd'}`,

                borderRadius: 10,

                background: task.status === 'completed' ? '#f9f9f9' : '#fff',

                opacity: task.status === 'completed' ? 0.7 : 1,

              }}

            >

              <button

                onClick={() => onToggle(task)}

                style={{

                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,

                  border: `2px solid ${PRIORITY_COLORS[task.priority] || '#ddd'}`,

                  background: task.status === 'completed' ? GREEN : 'transparent',

                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',

                }}

              >

                {task.status === 'completed' && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}

              </button>

              <div style={{ flex: 1, minWidth: 0 }}>

                <div style={{ fontWeight: 700, fontSize: 13, color: NAVY, textDecoration: task.status === 'completed' ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                  {task.title}

                </div>

                <div style={{ fontSize: 11, color: '#888', marginTop: 2, display: 'flex', gap: 10 }}>

                  {task.scheduled_date && <span>📅 {task.scheduled_date}</span>}

                  {task.scheduled_time && <span>⏰ {task.scheduled_time}</span>}

                  {task.due_date && <span style={{ color: task.due_date < format(new Date(), 'yyyy-MM-dd') ? RED : '#888' }}>Due: {task.due_date}</span>}

                  {task.duration_minutes && <span>⏱ {task.duration_minutes}m</span>}

                  {task.assigned_to && <span>👤 {task.assigned_to}</span>}

                </div>

              </div>

              <span style={{ background: PRIORITY_COLORS[task.priority], color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>

                {task.priority?.toUpperCase()}

              </span>

              {showDocs && (

                <button

                  onClick={() => loadDocs(task.id)}

                  style={{ background: '#f0f4ff', color: '#3b82f6', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}

                >

                  📎

                </button>

              )}

              <button onClick={() => onEdit(task)} style={{ background: '#f0f0f0', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 11, color: NAVY, fontWeight: 600 }}>

                Edit

              </button>

              <button onClick={() => onDelete(task.id)} style={{ background: '#ffebee', color: RED, border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: 11 }}>

                ✕

              </button>

            </div>

            {showDocs && expandedDoc === task.id && (

              <div style={{ marginLeft: 32, marginTop: 6, padding: 12, background: '#f9fafb', borderRadius: 8, border: '1px solid #e0e0e0' }}>

                <DocumentUpload

                  taskId={task.id}

                  documents={docsByTask[task.id] || []}

                  onDocumentsChange={() => {

                    DocEntity.filter({ task_id: task.id }).then(docs => {

                      setDocsByTask(prev => ({ ...prev, [task.id]: docs || [] }));

                    });

                  }}

                />

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}

// ─── TASK MODAL ───────────────────────────────────────────────────────────────

function TaskModal({ task, defaultDate, onSave, onClose }) {

  const [form, setForm] = useState(task || {

    title: '', description: '', priority: 'medium', status: 'planned',

    category: 'operations', scheduled_date: defaultDate || format(new Date(), 'yyyy-MM-dd'),

    scheduled_time: '', due_date: '', duration_minutes: 30, assigned_to: '',

    tags: '', notes: '', recurring: 'none',

  });

  return (

    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>

      <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '90%', maxWidth: 680, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>

          <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY, margin: 0 }}>{task ? '✎ Edit Task' : '➕ New Task'}</h2>

          <button onClick={onClose} style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 18 }}>✕</button>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Title */}

          <input

            placeholder="Task title *"

            value={form.title}

            onChange={e => setForm({ ...form, title: e.target.value })}

            style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 16, fontWeight: 600, boxSizing: 'border-box' }}

          />

          {/* Description */}

          <textarea

            placeholder="Description / notes..."

            value={form.description}

            onChange={e => setForm({ ...form, description: e.target.value })}

            rows={3}

            style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}

          />

          {/* Row: Priority + Status + Category */}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>PRIORITY</label>

              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, background: '#fff' }}>

                <option value="low">🟢 Low</option>

                <option value="medium">🔵 Medium</option>

                <option value="high">🟠 High</option>

                <option value="critical">🔴 Critical</option>

              </select>

            </div>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>STATUS</label>

              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, background: '#fff' }}>

                <option value="planned">📌 Planned</option>

                <option value="in_progress">🔄 In Progress</option>

                <option value="completed">✅ Done</option>

                <option value="blocked">🚫 Blocked</option>

              </select>

            </div>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>CATEGORY</label>

              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, background: '#fff' }}>

                <option value="sales">💼 Sales</option>

                <option value="operations">⚙️ Operations</option>

                <option value="marketing">📢 Marketing</option>

                <option value="finance">💰 Finance</option>

                <option value="crm">🗂️ CRM</option>

                <option value="follow_up">📞 Follow-up</option>

                <option value="closing">🎉 Closing</option>

                <option value="admin">🏢 Admin</option>

              </select>

            </div>

          </div>

          {/* Row: Date + Time + Duration + Due Date */}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>SCHEDULED DATE</label>

              <input type="date" value={form.scheduled_date} onChange={e => setForm({ ...form, scheduled_date: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, boxSizing: 'border-box' }} />

            </div>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>TIME</label>

              <input type="time" value={form.scheduled_time} onChange={e => setForm({ ...form, scheduled_time: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, boxSizing: 'border-box' }} />

            </div>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>DURATION (min)</label>

              <input type="number" value={form.duration_minutes} onChange={e => setForm({ ...form, duration_minutes: parseInt(e.target.value) || 0 })} min={0} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, boxSizing: 'border-box' }} />

            </div>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>DUE DATE</label>

              <input type="date" value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, boxSizing: 'border-box' }} />

            </div>

          </div>

          {/* Row: Assigned + Tags + Recurring */}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>ASSIGNED TO</label>

              <input placeholder="Team member" value={form.assigned_to} onChange={e => setForm({ ...form, assigned_to: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, boxSizing: 'border-box' }} />

            </div>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>TAGS</label>

              <input placeholder="urgent, crm, deal" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, boxSizing: 'border-box' }} />

            </div>

            <div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#666', display: 'block', marginBottom: 4 }}>RECURRING</label>

              <select value={form.recurring} onChange={e => setForm({ ...form, recurring: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: 8, background: '#fff' }}>

                <option value="none">None</option>

                <option value="daily">Daily</option>

                <option value="weekly">Weekly</option>

                <option value="biweekly">Bi-weekly</option>

                <option value="monthly">Monthly</option>

              </select>

            </div>

          </div>

        </div>

        {/* Document upload for existing tasks */}

        {task && (

          <div style={{ marginTop: 16 }}>

            <div style={{ fontSize: 11, fontWeight: 700, color: '#666', marginBottom: 6 }}>ATTACHMENTS</div>

            <DocumentUpload taskId={task.id} documents={[]} onDocumentsChange={() => {}} />

          </div>

        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>

          <button onClick={onClose} style={{ flex: 1, padding: '13px', border: '2px solid #e0e0e0', borderRadius: 10, background: '#fff', color: NAVY, fontWeight: 700, cursor: 'pointer' }}>

            Cancel

          </button>

          <button

            onClick={() => form.title.trim() && onSave(form)}

            disabled={!form.title.trim()}

            style={{ flex: 2, padding: '13px', border: 'none', borderRadius: 10, background: form.title.trim() ? GOLD : '#ccc', color: '#fff', fontWeight: 900, fontSize: 15, cursor: form.title.trim() ? 'pointer' : 'default' }}

          >

            {task ? '💾 Save Changes' : '✅ Create Task'}

          </button>

        </div>

      </div>

    </div>

  );

}
