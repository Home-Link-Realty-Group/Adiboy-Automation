# New Microsoft Word Document (7)

Source: New Microsoft Word Document (7).docx

import \{ useState, useEffect \} from "react";

import \{ List, EnterpriseTask \} from "@/api/entities";

import \{ format \} from "date\-fns";

const NAVY = "\#0B1F45";

const NAVY2 = "\#122B5E";

const GOLD = "\#D4A843";

const GREEN = "\#27ae60";

const RED = "\#e74c3c";

const LIST\_COLORS = \[

  \{ name: "Blue", hex: "\#3b82f6" \},

  \{ name: "Purple", hex: "\#a855f7" \},

  \{ name: "Pink", hex: "\#ec4899" \},

  \{ name: "Red", hex: "\#ef4444" \},

  \{ name: "Orange", hex: "\#f97316" \},

  \{ name: "Green", hex: "\#10b981" \},

  \{ name: "Teal", hex: "\#14b8a6" \},

  \{ name: "Cyan", hex: "\#06b6d4" \},

\];

export default function ListsPanel\(\{ onClose \}\) \{

  const \[lists, setLists\] = useState\(\[\]\);

  const \[selectedList, setSelectedList\] = useState\(null\);

  const \[showNewList, setShowNewList\] = useState\(false\);

  const \[showTaskForm, setShowTaskForm\] = useState\(false\);

  const \[listName, setListName\] = useState\(""\);

  const \[listColor, setListColor\] = useState\("Blue"\);

  const \[listIcon, setListIcon\] = useState\("📋"\);

  const \[newTaskTitle, setNewTaskTitle\] = useState\(""\);

  const \[newTaskSubtasks, setNewTaskSubtasks\] = useState\(\[\]\);

  const \[currentSubtask, setCurrentSubtask\] = useState\(""\);

  const \[loading, setLoading\] = useState\(true\);

  const \[tasks, setTasks\] = useState\(\[\]\);

  useEffect\(\(\) => \{ loadAll\(\); \}, \[\]\);

  async function loadAll\(\) \{

    setLoading\(true\);

    try \{

      const \[l, t\] = await Promise\.all\(\[List\.list\("\-sort\_order", 100\), EnterpriseTask\.list\(\)\]\);

      setLists\(l || \[\]\);

      setTasks\(t || \[\]\);

      if \(l && l\.length > 0\) setSelectedList\(l\[0\]\);

    \} catch \(e\) \{ console\.error\(e\); \}

    setLoading\(false\);

  \}

  async function createList\(\) \{

    if \(\!listName\.trim\(\)\) return;

    const newList = await List\.create\(\{

      name: listName,

      color: LIST\_COLORS\.find\(c => c\.name === listColor\)?\.hex || "\#3b82f6",

      icon: listIcon,

      task\_ids: \[\],

      is\_archived: false,

      sort\_order: lists\.length,

    \}\);

    setLists\(\[\.\.\.lists, newList\]\);

    setSelectedList\(newList\);

    setListName\(""\);

    setListColor\("Blue"\);

    setListIcon\("📋"\);

    setShowNewList\(false\);

  \}

  async function addTask\(\) \{

    if \(\!newTaskTitle\.trim\(\) || \!selectedList\) return;

    const task = await EnterpriseTask\.create\(\{

      title: newTaskTitle,

      scheduled\_date: format\(new Date\(\), "yyyy\-MM\-dd"\),

      priority: "medium",

      status: "planned",

      category: "operations",

      subtasks: newTaskSubtasks\.map\(s => \(\{ id: \`sub\_$\{Date\.now\(\)\}\_$\{Math\.random\(\)\}\`, name: s, completed: false \}\)\),

      list\_id: selectedList\.id,

    \}\);

    const updatedList = \{ \.\.\.selectedList, task\_ids: \[\.\.\.\(selectedList\.task\_ids || \[\]\), task\.id\] \};

    await List\.update\(selectedList\.id, \{ task\_ids: updatedList\.task\_ids \}\);

    setSelectedList\(updatedList\);

    setNewTaskTitle\(""\);

    setNewTaskSubtasks\(\[\]\);

    setShowTaskForm\(false\);

    loadAll\(\);

  \}

  async function toggleSubtask\(task, subtaskId\) \{

    const updated = task\.subtasks\.map\(s => s\.id === subtaskId ? \{ \.\.\.s, completed: \!s\.completed \} : s\);

    await EnterpriseTask\.update\(task\.id, \{ subtasks: updated \}\);

    loadAll\(\);

  \}

  async function toggleTask\(task\) \{

    const newStatus = task\.status === "completed" ? "planned" : "completed";

    await EnterpriseTask\.update\(task\.id, \{ status: newStatus, completed\_at: newStatus === "completed" ? new Date\(\)\.toISOString\(\) : "" \}\);

    loadAll\(\);

  \}

  async function deleteTask\(taskId\) \{

    if \(\!confirm\("Delete this task?"\)\) return;

    await EnterpriseTask\.delete\(taskId\);

    if \(selectedList\) \{

      const updated = selectedList\.task\_ids\.filter\(id => id \!== taskId\);

      await List\.update\(selectedList\.id, \{ task\_ids: updated \}\);

      setSelectedList\(\{ \.\.\.selectedList, task\_ids: updated \}\);

    \}

    loadAll\(\);

  \}

  async function deleteList\(\) \{

    if \(\!confirm\(\`Delete "$\{selectedList\.name\}"?\`\)\) return;

    await List\.delete\(selectedList\.id\);

    const updated = lists\.filter\(l => l\.id \!== selectedList\.id\);

    setLists\(updated\);

    setSelectedList\(updated\[0\] || null\);

  \}

  function exportList\(\) \{

    if \(\!selectedList\) return;

    const listTasks = tasks\.filter\(t => selectedList\.task\_ids?\.includes\(t\.id\)\);

    const html = \`

      <\!DOCTYPE html>

      <html>

      <head>

        <meta charset="UTF\-8">

        <title>$\{selectedList\.name\}</title>

        <style>

          body \{ font\-family: \-apple\-system, BlinkMacSystemFont, 'Segoe UI', sans\-serif; margin: 20px; background: \#f5f5f5; \}

          \.container \{ max\-width: 800px; margin: 0 auto; background: \#fff; padding: 30px; border\-radius: 12px; box\-shadow: 0 2px 8px rgba\(0,0,0,0\.1\); \}

          h1 \{ color: \#0B1F45; margin\-bottom: 20px; \}

          \.meta \{ font\-size: 12px; color: \#888; margin\-bottom: 20px; padding\-bottom: 10px; border\-bottom: 1px solid \#eee; \}

          \.task \{ margin\-bottom: 16px; padding: 14px; border\-left: 4px solid $\{selectedList\.color\}; background: \#f9f9f9; border\-radius: 6px; \}

          \.task\-title \{ font\-weight: 700; font\-size: 15px; color: \#0B1F45; margin\-bottom: 6px; \}

          \.task\-meta \{ font\-size: 11px; color: \#888; margin\-bottom: 8px; \}

          \.subtasks \{ margin\-left: 14px; border\-left: 2px solid \#ddd; padding\-left: 12px; margin\-top: 8px; \}

          \.subtask \{ font\-size: 13px; color: \#555; padding: 4px 0; display: flex; align\-items: center; \}

          \.subtask\-check \{ width: 16px; height: 16px; border: 2px solid \#ddd; border\-radius: 3px; margin\-right: 8px; display: flex; align\-items: center; justify\-content: center; font\-size: 11px; \}

          \.completed \{ text\-decoration: line\-through; color: \#999; \}

          \.print\-date \{ position: absolute; top: 20px; right: 30px; font\-size: 11px; color: \#bbb; \}

          @media print \{ body \{ margin: 0; background: \#fff; \} \.container \{ box\-shadow: none; padding: 0; \} \.print\-date \{ display: block; \} \}

        </style>

      </head>

      <body>

        <div class="container">

          <div class="print\-date">Printed: $\{format\(new Date\(\), "MMM d, yyyy HH:mm"\)\}</div>

          <h1>$\{selectedList\.icon\} $\{selectedList\.name\}</h1>

          <div class="meta">$\{listTasks\.length\} task$\{listTasks\.length \!== 1 ? "s" : ""\}</div>

          $\{listTasks\.map\(task => \`

            <div class="task $\{task\.status === "completed" ? "completed" : ""\}">

              <div class="task\-title">$\{task\.status === "completed" ? "✅" : "□"\} $\{task\.title\}</div>

              <div class="task\-meta">Priority: $\{task\.priority?\.toUpperCase\(\)\}</div>

              $\{task\.subtasks && task\.subtasks\.length > 0 ? \`

                <div class="subtasks">

                  $\{task\.subtasks\.map\(s => \`

                    <div class="subtask $\{s\.completed ? "completed" : ""\}">

                      <div class="subtask\-check">$\{s\.completed ? "✓" : ""\}</div>

                      $\{s\.name\}

                    </div>

                  \`\)\.join\(""\)\}

                </div>

              \` : ""\}

            </div>

          \`\)\.join\(""\)\}

        </div>

      </body>

      </html>

    \`;

    const blob = new Blob\(\[html\], \{ type: "text/html;charset=utf\-8" \}\);

    const url = URL\.createObjectURL\(blob\);

    const a = document\.createElement\("a"\);

    a\.href = url;

    a\.download = \`$\{selectedList\.name\}\_$\{format\(new Date\(\), "yyyy\-MM\-dd"\)\}\.html\`;

    document\.body\.appendChild\(a\);

    a\.click\(\);

    document\.body\.removeChild\(a\);

    URL\.revokeObjectURL\(url\);

  \}

  const listTasks = selectedList ? tasks\.filter\(t => selectedList\.task\_ids?\.includes\(t\.id\)\) : \[\];

  const completedCount = listTasks\.filter\(t => t\.status === "completed"\)\.length;

  if \(loading\) return <div style=\{\{ padding: 20, textAlign: "center", color: "\#888" \}\}>Loading lists\.\.\.</div>;

  return \(

    <div style=\{\{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, height: "100%", maxHeight: "calc\(100vh \- 200px\)" \}\}>

      \{/\* Sidebar \*/\}

      <div style=\{\{ borderRight: "1px solid \#e0e0e0", overflowY: "auto", paddingRight: 12 \}\}>

        <button onClick=\{\(\) => setShowNewList\(true\)\} style=\{\{ width: "100%", background: GOLD, color: "\#fff", border: "none", borderRadius: 10, padding: "11px", fontWeight: 800, fontSize: 13, cursor: "pointer", marginBottom: 16 \}\}>

          ＋ New List

        </button>

        <div style=\{\{ display: "flex", flexDirection: "column", gap: 8 \}\}>

          \{lists\.map\(list => \(

            <div

              key=\{list\.id\}

              onClick=\{\(\) => setSelectedList\(list\)\}

              style=\{\{

                padding: "12px 14px",

                background: selectedList?\.id === list\.id ? "\#f0f4ff" : "\#fff",

                border: \`2px solid $\{selectedList?\.id === list\.id ? "\#0B1F45" : "\#f0f0f0"\}\`,

                borderRadius: 10,

                cursor: "pointer",

                transition: "all 0\.15s",

              \}\}>

              <div style=\{\{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 \}\}>

                <span style=\{\{ fontSize: 18 \}\}>\{list\.icon\}</span>

                <span style=\{\{ fontWeight: 700, fontSize: 13, color: NAVY \}\}>\{list\.name\}</span>

              </div>

              <div style=\{\{ fontSize: 11, color: "\#888", marginLeft: 28 \}\}>\{tasks\.filter\(t => list\.task\_ids?\.includes\(t\.id\)\)\.length\} tasks</div>

            </div>

          \)\)\}

        </div>

        \{selectedList && \(

          <button onClick=\{deleteList\} style=\{\{ width: "100%", marginTop: 16, background: "\#fff5f5", color: RED, border: \`1px solid $\{RED\}44\`, borderRadius: 8, padding: "8px", fontSize: 11, fontWeight: 700, cursor: "pointer" \}\}>

            🗑️ Delete List

          </button>

        \)\}

      </div>

      \{/\* Main Content \*/\}

      \{selectedList ? \(

        <div style=\{\{ overflowY: "auto", paddingRight: 12 \}\}>

          <div style=\{\{ display: "flex", justifyContent: "space\-between", alignItems: "center", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid \#f0f0f0" \}\}>

            <div>

              <h2 style=\{\{ fontSize: 24, fontWeight: 900, color: NAVY, margin: 0, marginBottom: 4 \}\}>\{selectedList\.icon\} \{selectedList\.name\}</h2>

              <div style=\{\{ fontSize: 12, color: "\#888" \}\}>\{completedCount\} of \{listTasks\.length\} completed</div>

            </div>

            <div style=\{\{ display: "flex", gap: 8 \}\}>

              <button onClick=\{exportList\} style=\{\{ background: GREEN, color: "\#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" \}\}>

                📄 Export

              </button>

              <button onClick=\{\(\) => window\.print\(\)\} style=\{\{ background: NAVY2, color: "\#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" \}\}>

                🖨️ Print

              </button>

            </div>

          </div>

          \{/\* Progress Bar \*/\}

          <div style=\{\{ background: "\#f0f0f0", borderRadius: 10, height: 8, marginBottom: 20, overflow: "hidden" \}\}>

            <div style=\{\{ width: \`$\{listTasks\.length > 0 ? \(completedCount / listTasks\.length\) \* 100 : 0\}%\`, height: "100%", background: GREEN, transition: "width 0\.3s" \}\} />

          </div>

          \{/\* Tasks \*/\}

          <div style=\{\{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 \}\}>

            \{listTasks\.length === 0 ? \(

              <div style=\{\{ textAlign: "center", padding: "40px 20px", color: "\#888" \}\}>

                <div style=\{\{ fontSize: 32, marginBottom: 8 \}\}>📭</div>

                <div style=\{\{ fontWeight: 700, marginBottom: 8 \}\}>No tasks yet</div>

                <button onClick=\{\(\) => setShowTaskForm\(true\)\} style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" \}\}>

                  ＋ Add First Task

                </button>

              </div>

            \) : \(

              listTasks\.map\(task => \(

                <div key=\{task\.id\} style=\{\{ background: task\.status === "completed" ? "\#f9f9f9" : "\#fff", border: \`1\.5px solid $\{task\.status === "completed" ? "\#e0e0e0" : selectedList\.color\}\`, borderRadius: 10, padding: 14, opacity: task\.status === "completed" ? 0\.7 : 1 \}\}>

                  <div style=\{\{ display: "flex", gap: 10, alignItems: "flex\-start" \}\}>

                    <button onClick=\{\(\) => toggleTask\(task\)\} style=\{\{ background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 2, flexShrink: 0 \}\}>

                      <div style=\{\{ width: 20, height: 20, borderRadius: "50%", border: \`2px solid $\{selectedList\.color\}\`, background: task\.status === "completed" ? selectedList\.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" \}\}>

                        \{task\.status === "completed" && <span style=\{\{ color: "\#fff", fontSize: 10, fontWeight: 900 \}\}>✓</span>\}

                      </div>

                    </button>

                    <div style=\{\{ flex: 1 \}\}>

                      <div style=\{\{ fontWeight: 700, fontSize: 13, color: task\.status === "completed" ? "\#aaa" : NAVY, textDecoration: task\.status === "completed" ? "line\-through" : "none", marginBottom: 4 \}\}>\{task\.title\}</div>

                      \{task\.subtasks && task\.subtasks\.length > 0 && \(

                        <div style=\{\{ marginTop: 8, paddingTop: 8, borderTop: "1px solid \#f0f0f0" \}\}>

                          \{task\.subtasks\.map\(sub => \(

                            <div key=\{sub\.id\} style=\{\{ display: "flex", gap: 8, padding: "4px 0", alignItems: "center" \}\}>

                              <input

                                type="checkbox"

                                checked=\{sub\.completed\}

                                onChange=\{\(\) => toggleSubtask\(task, sub\.id\)\}

                                style=\{\{ width: 16, height: 16, cursor: "pointer", accentColor: selectedList\.color \}\}

                              />

                              <span style=\{\{ fontSize: 12, color: sub\.completed ? "\#999" : "\#555", textDecoration: sub\.completed ? "line\-through" : "none" \}\}>

                                \{sub\.name\}

                              </span>

                            </div>

                          \)\)\}

                        </div>

                      \)\}

                    </div>

                    <button onClick=\{\(\) => deleteTask\(task\.id\)\} style=\{\{ background: "\#fff5f5", color: RED, border: \`1px solid $\{RED\}44\`, borderRadius: 6, padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer", flexShrink: 0 \}\}>

                      ✕

                    </button>

                  </div>

                </div>

              \)\)

            \)\}

          </div>

          <button onClick=\{\(\) => setShowTaskForm\(true\)\} style=\{\{ width: "100%", background: "\#f0f0f0", color: NAVY, border: "2px dashed \#d0d0d0", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer" \}\}>

            ＋ Add Task

          </button>

        </div>

      \) : \(

        <div style=\{\{ display: "flex", alignItems: "center", justifyContent: "center", color: "\#888" \}\}>

          <div style=\{\{ textAlign: "center" \}\}>

            <div style=\{\{ fontSize: 48, marginBottom: 12 \}\}>📋</div>

            <div style=\{\{ fontWeight: 700 \}\}>No lists yet</div>

            <div style=\{\{ fontSize: 12, marginTop: 4 \}\}>Create one to get started\!</div>

          </div>

        </div>

      \)\}

      \{/\* New List Modal \*/\}

      \{showNewList && \(

        <div style=\{\{ position: "fixed", inset: 0, background: "rgba\(0,0,0,0\.5\)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" \}\} onClick=\{\(\) => setShowNewList\(false\)\}>

          <div style=\{\{ background: "\#fff", borderRadius: 16, padding: 28, width: "90%", maxWidth: 480, boxShadow: "0 20px 60px rgba\(0,0,0,0\.3\)" \}\} onClick=\{e => e\.stopPropagation\(\)\}>

            <h2 style=\{\{ fontSize: 20, fontWeight: 900, color: NAVY, marginBottom: 20 \}\}>➕ Create List</h2>

            <div style=\{\{ marginBottom: 16 \}\}>

              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 6 \}\}>LIST NAME \*</label>

              <input value=\{listName\} onChange=\{e => setListName\(e\.target\.value\)\} placeholder="e\.g\., Weekly Tasks"

                style=\{\{ width: "100%", padding: "10px 12px", border: "2px solid \#e0e0e0", borderRadius: 8, fontSize: 14, boxSizing: "border\-box" \}\} />

            </div>

            <div style=\{\{ marginBottom: 16 \}\}>

              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 6 \}\}>ICON</label>

              <input value=\{listIcon\} onChange=\{e => setListIcon\(e\.target\.value\)\} maxLength="2"

                style=\{\{ width: "100%", padding: "10px 12px", border: "2px solid \#e0e0e0", borderRadius: 8, fontSize: 20, boxSizing: "border\-box", textAlign: "center" \}\} />

            </div>

            <div style=\{\{ marginBottom: 20 \}\}>

              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 8 \}\}>COLOR</label>

              <div style=\{\{ display: "grid", gridTemplateColumns: "repeat\(8, 1fr\)", gap: 6 \}\}>

                \{LIST\_COLORS\.map\(c => \(

                  <button key=\{c\.name\} onClick=\{\(\) => setListColor\(c\.name\)\}

                    style=\{\{ width: "100%", aspectRatio: "1", borderRadius: 8, background: c\.hex, border: listColor === c\.name ? "4px solid \#000" : "2px solid \#ddd", cursor: "pointer", transition: "all 0\.15s" \}\}

                    title=\{c\.name\} />

                \)\)\}

              </div>

            </div>

            <div style=\{\{ display: "flex", gap: 12 \}\}>

              <button onClick=\{\(\) => setShowNewList\(false\)\} style=\{\{ flex: 1, padding: "11px", border: "2px solid \#e0e0e0", borderRadius: 10, background: "\#fff", color: NAVY, fontWeight: 700, cursor: "pointer" \}\}>Cancel</button>

              <button onClick=\{createList\} disabled=\{\!listName\.trim\(\)\} style=\{\{ flex: 1, padding: "11px", border: "none", borderRadius: 10, background: listName\.trim\(\) ? GOLD : "\#ccc", color: "\#fff", fontWeight: 800, cursor: listName\.trim\(\) ? "pointer" : "default" \}\}>

                ✅ Create

              </button>

            </div>

          </div>

        </div>

      \)\}

      \{/\* New Task Modal \*/\}

      \{showTaskForm && selectedList && \(

        <div style=\{\{ position: "fixed", inset: 0, background: "rgba\(0,0,0,0\.5\)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" \}\} onClick=\{\(\) => setShowTaskForm\(false\)\}>

          <div style=\{\{ background: "\#fff", borderRadius: 16, padding: 28, width: "90%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba\(0,0,0,0\.3\)" \}\} onClick=\{e => e\.stopPropagation\(\)\}>

            <h2 style=\{\{ fontSize: 20, fontWeight: 900, color: NAVY, marginBottom: 20 \}\}>➕ New Task in \{selectedList\.icon\} \{selectedList\.name\}</h2>

            <div style=\{\{ marginBottom: 16 \}\}>

              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 6 \}\}>TASK TITLE \*</label>

              <input value=\{newTaskTitle\} onChange=\{e => setNewTaskTitle\(e\.target\.value\)\} placeholder="What to do?"

                style=\{\{ width: "100%", padding: "10px 12px", border: "2px solid \#e0e0e0", borderRadius: 8, fontSize: 14, boxSizing: "border\-box" \}\} />

            </div>

            <div style=\{\{ marginBottom: 20 \}\}>

              <label style=\{\{ fontSize: 11, fontWeight: 700, color: "\#555", display: "block", marginBottom: 8 \}\}>SUBTASKS \(optional\)</label>

              \{newTaskSubtasks\.map\(\(sub, i\) => \(

                <div key=\{i\} style=\{\{ display: "flex", gap: 6, marginBottom: 6 \}\}>

                  <input value=\{sub\} disabled style=\{\{ flex: 1, padding: "8px 12px", border: "1px solid \#e0e0e0", borderRadius: 6, fontSize: 12, background: "\#f9f9f9", boxSizing: "border\-box" \}\} />

                  <button onClick=\{\(\) => setNewTaskSubtasks\(prev => prev\.filter\(\(\_, idx\) => idx \!== i\)\)\}

                    style=\{\{ background: "\#fff5f5", color: RED, border: \`1px solid $\{RED\}44\`, borderRadius: 6, padding: "6px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0 \}\}>✕</button>

                </div>

              \)\)\}

              <div style=\{\{ display: "flex", gap: 6 \}\}>

                <input value=\{currentSubtask\} onChange=\{e => setCurrentSubtask\(e\.target\.value\)\} onKeyDown=\{e => \{

                  if \(e\.key === "Enter" && currentSubtask\.trim\(\)\) \{

                    setNewTaskSubtasks\(\[\.\.\.newTaskSubtasks, currentSubtask\]\);

                    setCurrentSubtask\(""\);

                  \}

                \}\} placeholder="Add subtask and press Enter"

                  style=\{\{ flex: 1, padding: "8px 12px", border: "1px solid \#e0e0e0", borderRadius: 6, fontSize: 12, boxSizing: "border\-box" \}\} />

                <button onClick=\{\(\) => \{

                  if \(currentSubtask\.trim\(\)\) \{

                    setNewTaskSubtasks\(\[\.\.\.newTaskSubtasks, currentSubtask\]\);

                    setCurrentSubtask\(""\);

                  \}

                \}\} style=\{\{ background: GOLD, color: "\#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer", flexShrink: 0 \}\}>Add</button>

              </div>

            </div>

            <div style=\{\{ display: "flex", gap: 12 \}\}>

              <button onClick=\{\(\) => setShowTaskForm\(false\)\} style=\{\{ flex: 1, padding: "11px", border: "2px solid \#e0e0e0", borderRadius: 10, background: "\#fff", color: NAVY, fontWeight: 700, cursor: "pointer" \}\}>Cancel</button>

              <button onClick=\{addTask\} disabled=\{\!newTaskTitle\.trim\(\)\} style=\{\{ flex: 1, padding: "11px", border: "none", borderRadius: 10, background: newTaskTitle\.trim\(\) ? GOLD : "\#ccc", color: "\#fff", fontWeight: 800, cursor: newTaskTitle\.trim\(\) ? "pointer" : "default" \}\}>

                ✅ Add Task

              </button>

            </div>

          </div>

        </div>

      \)\}

    </div>

  \);

\}
