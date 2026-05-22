# New Microsoft Word Document (79)

Source: New Microsoft Word Document (79).docx

import { useState, useEffect } from 'react';

const PRIORITIES = ['High', 'Medium', 'Low'];

const CATEGORIES = ['Social Media', 'Lead Follow-Up', 'Marketing', 'Deals', 'Admin', 'Other'];

const STATUS_OPTIONS = ['Todo', 'In Progress', 'Done'];

const COLORS = {

  High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e',

  Todo: '#3b82f6', 'In Progress': '#f59e0b', Done: '#22c55e',

};

const STORAGE_KEY = 'hq_tasks_v2';

const IMG_STORAGE_KEY = 'hq_task_images_v2';

function loadTasks() {

  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }

}

function saveTasks(tasks) {

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

}

function loadImages() {

  try { return JSON.parse(localStorage.getItem(IMG_STORAGE_KEY) || '{}'); } catch { return {}; }

}

function saveImages(imgs) {

  localStorage.setItem(IMG_STORAGE_KEY, JSON.stringify(imgs));

}

const inp = (extra = {}) => ({

  background: '#0a111e', border: '1px solid #1e2d40', borderRadius: 8,

  padding: '9px 12px', color: '#f1f5f9', fontSize: 13, outline: 'none',

  fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', ...extra,

});

export default function TaskManager() {

  const [tasks, setTasks] = useState(() => loadTasks());

  const [images, setImages] = useState(() => loadImages());

  const [filter, setFilter] = useState('All');

  const [catFilter, setCatFilter] = useState('All');

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [viewId, setViewId] = useState(null);

  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', category: 'Social Media', status: 'Todo', due_date: '', tags: '' });

  const [imgUploadId, setImgUploadId] = useState(null);

  const [search, setSearch] = useState('');

  const persist = (updated) => { setTasks(updated); saveTasks(updated); };

  const persistImages = (updated) => { setImages(updated); saveImages(updated); };

  const resetForm = () => setForm({ title: '', description: '', priority: 'Medium', category: 'Social Media', status: 'Todo', due_date: '', tags: '' });

  const openNew = () => { resetForm(); setEditId(null); setShowForm(true); };

  const openEdit = (task) => {

    setForm({ title: task.title, description: task.description || '', priority: task.priority, category: task.category, status: task.status, due_date: task.due_date || '', tags: task.tags || '' });

    setEditId(task.id);

    setShowForm(true);

  };

  const saveTask = () => {

    if (!form.title.trim()) return;

    if (editId) {

      persist(tasks.map(t => t.id === editId ? { ...t, ...form, updated: new Date().toISOString() } : t));

    } else {

      persist([{ id: Date.now(), ...form, created: new Date().toISOString(), updated: new Date().toISOString() }, ...tasks]);

    }

    setShowForm(false); setEditId(null); resetForm();

  };

  const deleteTask = (id) => {

    if (!confirm('Delete this task?')) return;

    persist(tasks.filter(t => t.id !== id));

    const imgs = { ...images }; delete imgs[id]; persistImages(imgs);

    if (viewId === id) setViewId(null);

  };

  const cycleStatus = (task) => {

    const idx = STATUS_OPTIONS.indexOf(task.status);

    const next = STATUS_OPTIONS[(idx + 1) % STATUS_OPTIONS.length];

    persist(tasks.map(t => t.id === task.id ? { ...t, status: next, updated: new Date().toISOString() } : t));

  };

  const handleImageUpload = (e, taskId) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {

      const updated = { ...images, [taskId]: [...(images[taskId] || []), { id: Date.now(), src: ev.target.result, name: file.name }] };

      persistImages(updated);

    };

    reader.readAsDataURL(file);

    setImgUploadId(null);

  };

  const deleteImage = (taskId, imgId) => {

    const updated = { ...images, [taskId]: (images[taskId] || []).filter(i => i.id !== imgId) };

    persistImages(updated);

  };

  const filtered = tasks.filter(t => {

    const matchStatus = filter === 'All' || t.status === filter;

    const matchCat = catFilter === 'All' || t.category === catFilter;

    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || (t.description || '').toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchCat && matchSearch;

  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => { acc[s] = tasks.filter(t => t.status === s).length; return acc; }, {});

  const viewTask = tasks.find(t => t.id === viewId);

  return (

    <div style={{ display: 'grid', gridTemplateColumns: viewTask ? '1fr 380px' : '1fr', gap: 20 }}>

      {/* ── LEFT: Task List ── */}

      <div>

        {/* Header */}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>

          <div>

            <div style={{ fontSize: 18, fontWeight: 900, color: '#f1f5f9' }}>✅ Task Manager</div>

            <div style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>{tasks.length} total · {counts['In Progress']} in progress · {counts.Done} done</div>

          </div>

          <button onClick={openNew} style={{ background: '#22c55e', border: 'none', color: '#fff', borderRadius: 9, padding: '10px 20px', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>

            + New Task

          </button>

        </div>

        {/* Search + Filters */}

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>

          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." style={{ ...inp({ flex: 1, minWidth: 140, padding: '8px 12px', fontSize: 12 }) }} />

          {['All', ...STATUS_OPTIONS].map(s => (

            <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${filter === s ? (COLORS[s] || '#22c55e') : '#1e2d40'}`, background: filter === s ? `${(COLORS[s] || '#22c55e')}18` : 'transparent', color: filter === s ? (COLORS[s] || '#22c55e') : '#475569', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>

              {s} {s !== 'All' ? `(${counts[s] || 0})` : `(${tasks.length})`}

            </button>

          ))}

        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>

          {['All', ...CATEGORIES].map(c => (

            <button key={c} onClick={() => setCatFilter(c)} style={{ padding: '5px 10px', borderRadius: 20, border: `1px solid ${catFilter === c ? '#a855f7' : '#1e2d40'}`, background: catFilter === c ? '#a855f718' : 'transparent', color: catFilter === c ? '#c084fc' : '#475569', fontWeight: 600, fontSize: 10, cursor: 'pointer' }}>

              {c}

            </button>

          ))}

        </div>

        {/* New/Edit Form */}

        {showForm && (

          <div style={{ background: '#0d1520', border: '1px solid #22c55e44', borderRadius: 14, padding: 20, marginBottom: 18 }}>

            <div style={{ fontSize: 13, fontWeight: 800, color: '#f1f5f9', marginBottom: 14 }}>{editId ? '✏️ Edit Task' : '+ New Task'}</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Task title *" style={inp()} />

              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description (optional)" rows={3} style={{ ...inp({ resize: 'vertical' }) }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>

                <div>

                  <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Priority</div>

                  <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} style={{ ...inp({ padding: '8px 10px', fontSize: 12 }) }}>

                    {PRIORITIES.map(p => <option key={p}>{p}</option>)}

                  </select>

                </div>

                <div>

                  <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Category</div>

                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ ...inp({ padding: '8px 10px', fontSize: 12 }) }}>

                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}

                  </select>

                </div>

                <div>

                  <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Status</div>

                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={{ ...inp({ padding: '8px 10px', fontSize: 12 }) }}>

                    {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}

                  </select>

                </div>

              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

                <div>

                  <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Due Date</div>

                  <input type="date" value={form.due_date} onChange={e => setForm(p => ({ ...p, due_date: e.target.value }))} style={{ ...inp({ padding: '8px 10px', fontSize: 12 }) }} />

                </div>

                <div>

                  <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Tags (comma separated)</div>

                  <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="facebook, instagram, ad" style={{ ...inp({ padding: '8px 10px', fontSize: 12 }) }} />

                </div>

              </div>

              <div style={{ display: 'flex', gap: 8 }}>

                <button onClick={saveTask} style={{ flex: 1, background: '#22c55e', border: 'none', color: '#fff', borderRadius: 8, padding: '10px', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>

                  {editId ? '💾 Update Task' : '+ Create Task'}

                </button>

                <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: '#0a111e', border: '1px solid #1e2d40', color: '#64748b', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>

                  Cancel

                </button>

              </div>

            </div>

          </div>

        )}

        {/* Task Cards */}

        {filtered.length === 0 ? (

          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#334155' }}>

            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>

            <div style={{ fontWeight: 700 }}>{search || filter !== 'All' ? 'No matching tasks' : 'No tasks yet — create your first one!'}</div>

          </div>

        ) : (

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

            {filtered.map(task => {

              const isOverdue = task.due_date && task.due_date < new Date().toISOString().split('T')[0] && task.status !== 'Done';

              const taskImgs = images[task.id] || [];

              return (

                <div key={task.id} style={{

                  background: viewId === task.id ? '#0d1c2f' : '#0d1520',

                  border: `1px solid ${viewId === task.id ? '#3b82f6' : isOverdue ? '#ef444430' : '#1e2d40'}`,

                  borderRadius: 12, padding: '14px 16px',

                  borderLeft: `3px solid ${COLORS[task.priority] || '#475569'}`,

                }}>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>

                    {/* Status toggle */}

                    <button onClick={() => cycleStatus(task)} title="Click to cycle status" style={{

                      width: 22, height: 22, borderRadius: '50%', border: `2px solid ${COLORS[task.status]}`,

                      background: task.status === 'Done' ? COLORS.Done : 'transparent',

                      cursor: 'pointer', flexShrink: 0, marginTop: 1,

                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff',

                    }}>

                      {task.status === 'Done' ? '✓' : task.status === 'In Progress' ? '▶' : ''}

                    </button>

                    <div style={{ flex: 1, minWidth: 0 }}>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>

                        <span style={{ fontWeight: 700, color: task.status === 'Done' ? '#475569' : '#f1f5f9', fontSize: 13, textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>{task.title}</span>

                        <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: `${COLORS[task.priority]}20`, color: COLORS[task.priority], fontWeight: 700 }}>{task.priority}</span>

                        <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: `${COLORS[task.status]}15`, color: COLORS[task.status], fontWeight: 700 }}>{task.status}</span>

                        {isOverdue && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: '#ef444420', color: '#f87171', fontWeight: 700 }}>OVERDUE</span>}

                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, color: '#475569', flexWrap: 'wrap' }}>

                        <span>📁 {task.category}</span>

                        {task.due_date && <span style={{ color: isOverdue ? '#f87171' : '#64748b' }}>📅 {task.due_date}</span>}

                        {taskImgs.length > 0 && <span style={{ color: '#60a5fa' }}>🖼 {taskImgs.length} image{taskImgs.length !== 1 ? 's' : ''}</span>}

                        {task.tags && task.tags.split(',').slice(0, 3).map(tag => (

                          <span key={tag} style={{ background: '#1e2d40', borderRadius: 4, padding: '1px 5px', color: '#94a3b8', fontSize: 9 }}>#{tag.trim()}</span>

                        ))}

                      </div>

                    </div>

                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>

                      <button onClick={() => setViewId(viewId === task.id ? null : task.id)} style={{ background: '#1e2d40', border: 'none', color: '#94a3b8', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 12 }}>👁</button>

                      <button onClick={() => openEdit(task)} style={{ background: '#1e2d40', border: 'none', color: '#94a3b8', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 12 }}>✏️</button>

                      <button onClick={() => deleteTask(task.id)} style={{ background: '#ef444418', border: 'none', color: '#f87171', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 12 }}>🗑</button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

      {/* ── RIGHT: Task Detail Panel ── */}

      {viewTask && (

        <div style={{ background: '#0a111e', border: '1px solid #1e2d40', borderRadius: 14, padding: 20, height: 'fit-content', position: 'sticky', top: 20 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>

            <div style={{ fontSize: 13, fontWeight: 900, color: '#f1f5f9', flex: 1, lineHeight: 1.4 }}>{viewTask.title}</div>

            <button onClick={() => setViewId(null)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 18, marginLeft: 8 }}>✕</button>

          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>

            <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, background: `${COLORS[viewTask.priority]}20`, color: COLORS[viewTask.priority], fontWeight: 700 }}>{viewTask.priority}</span>

            <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, background: `${COLORS[viewTask.status]}15`, color: COLORS[viewTask.status], fontWeight: 700 }}>{viewTask.status}</span>

            <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, background: '#1e2d40', color: '#94a3b8' }}>📁 {viewTask.category}</span>

          </div>

          {viewTask.description && (

            <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7, marginBottom: 14, borderTop: '1px solid #1e2d40', paddingTop: 12 }}>

              {viewTask.description}

            </div>

          )}

          {viewTask.due_date && (

            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>📅 Due: <span style={{ color: '#94a3b8', fontWeight: 700 }}>{viewTask.due_date}</span></div>

          )}

          {viewTask.tags && (

            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>

              {viewTask.tags.split(',').map(tag => (

                <span key={tag} style={{ background: '#1e2d40', borderRadius: 6, padding: '2px 7px', color: '#94a3b8', fontSize: 10 }}>#{tag.trim()}</span>

              ))}

            </div>

          )}

          {/* Images */}

          <div style={{ borderTop: '1px solid #1e2d40', paddingTop: 14 }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>

              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>🖼 Images / Files</div>

              <label style={{ background: '#1e2d40', border: 'none', color: '#94a3b8', borderRadius: 6, padding: '4px 10px', fontSize: 10, cursor: 'pointer', fontWeight: 700 }}>

                + Upload

                <input type="file" accept="image/*" onChange={e => handleImageUpload(e, viewTask.id)} style={{ display: 'none' }} />

              </label>

            </div>

            {(images[viewTask.id] || []).length === 0 ? (

              <div style={{ fontSize: 11, color: '#334155', fontStyle: 'italic' }}>No images attached yet.</div>

            ) : (

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>

                {(images[viewTask.id] || []).map(img => (

                  <div key={img.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #1e2d40' }}>

                    <img src={img.src} alt={img.name} style={{ width: '100%', height: 80, objectFit: 'cover', display: 'block' }} />

                    <button onClick={() => deleteImage(viewTask.id, img.id)} style={{ position: 'absolute', top: 3, right: 3, background: '#ef4444', border: 'none', color: '#fff', borderRadius: '50%', width: 18, height: 18, cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

                    <div style={{ fontSize: 8, color: '#475569', padding: '3px 5px', background: '#0a111e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</div>

                  </div>

                ))}

              </div>

            )}

          </div>

          <div style={{ borderTop: '1px solid #1e2d40', paddingTop: 12, marginTop: 14, fontSize: 9, color: '#334155' }}>

            Created: {new Date(viewTask.created).toLocaleDateString()} · Updated: {new Date(viewTask.updated).toLocaleDateString()}

          </div>

        </div>

      )}

    </div>

  );

}
