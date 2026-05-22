# New Microsoft Word Document (125)

Source: New Microsoft Word Document (125).docx

import \{ useState, useEffect, useCallback \} from 'react';

import \{ base44 \} from '@/api/base44Client';

const PLATFORM\_COLORS = \{ facebook: '\#1877F2', instagram: '\#E1306C', linkedin: '\#0A66C2', twitter: '\#1DA1F2' \};

const STATUS\_COLORS = \{ Draft: '\#9b59b6', Scheduled: '\#3498db', Published: '\#27ae60', Failed: '\#e74c3c' \};

const DAYS = \['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'\];

const MONTHS = \['January','February','March','April','May','June','July','August','September','October','November','December'\];

const TASK\_COLORS = \['\#e74c3c','\#f39c12','\#27ae60','\#3498db','\#9b59b6','\#1abc9c','\#D4A843'\];

const toDateStr = \(y, m, d\) => \`$\{y\}\-$\{String\(m \+ 1\)\.padStart\(2,'0'\)\}\-$\{String\(d\)\.padStart\(2,'0'\)\}\`;

// ── CalendarDay overlay \(tasks \+ notes per day, persisted in localStorage\) ──

const getDayData = \(dateStr\) => \{

  try \{ return JSON\.parse\(localStorage\.getItem\(\`cal\_day\_$\{dateStr\}\`\) || '\{"tasks":\[\],"note":""\}'\); \}

  catch \{ return \{ tasks: \[\], note: '' \}; \}

\};

const saveDayData = \(dateStr, data\) => \{

  localStorage\.setItem\(\`cal\_day\_$\{dateStr\}\`, JSON\.stringify\(data\)\);

\};

// ── Day Detail Panel ──────────────────────────────────────────────────────────

function DayPanel\(\{ dateStr, posts, onClose, onRefresh \}\) \{

  const \[dayData, setDayData\] = useState\(\(\) => getDayData\(dateStr\)\);

  const \[newTask, setNewTask\] = useState\(''\);

  const \[taskColor, setTaskColor\] = useState\('\#e74c3c'\);

  const \[saving, setSaving\] = useState\(false\);

  const \[deletingPost, setDeletingPost\] = useState\(null\);

  const persist = \(updated\) => \{

    setDayData\(updated\);

    saveDayData\(dateStr, updated\);

  \};

  const addTask = \(\) => \{

    if \(\!newTask\.trim\(\)\) return;

    const updated = \{ \.\.\.dayData, tasks: \[\.\.\.dayData\.tasks, \{ id: Date\.now\(\), text: newTask\.trim\(\), done: false, color: taskColor \}\] \};

    persist\(updated\);

    setNewTask\(''\);

  \};

  const toggleTask = \(id\) => \{

    const updated = \{ \.\.\.dayData, tasks: dayData\.tasks\.map\(t => t\.id === id ? \{ \.\.\.t, done: \!t\.done \} : t\) \};

    persist\(updated\);

  \};

  const deleteTask = \(id\) => \{

    const updated = \{ \.\.\.dayData, tasks: dayData\.tasks\.filter\(t => t\.id \!== id\) \};

    persist\(updated\);

  \};

  const updateNote = \(val\) => \{

    const updated = \{ \.\.\.dayData, note: val \};

    persist\(updated\);

  \};

  const deletePost = async \(postId\) => \{

    if \(\!confirm\('Delete this post?'\)\) return;

    setDeletingPost\(postId\);

    await base44\.entities\.SocialPost\.delete\(postId\);

    if \(onRefresh\) onRefresh\(\);

    setDeletingPost\(null\);

  \};

  const \[d, m, y\] = \(\(\) => \{

    const parts = dateStr\.split\('\-'\);

    return \[parseInt\(parts\[2\]\), parseInt\(parts\[1\]\) \- 1, parseInt\(parts\[0\]\)\];

  \}\)\(\);

  const label = new Date\(y, m, d\)\.toLocaleDateString\('en\-US', \{ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' \}\);

  return \(

    <div style=\{\{ position: 'fixed', inset: 0, background: 'rgba\(0,0,0,0\.85\)', zIndex: 1000, display: 'flex', alignItems: 'stretch', justifyContent: 'flex\-end' \}\}

      onClick=\{onClose\}>

      <div onClick=\{e => e\.stopPropagation\(\)\} style=\{\{

        width: 520, background: '\#0f0f1e', borderLeft: '1px solid rgba\(255,255,255,0\.1\)',

        display: 'flex', flexDirection: 'column', overflowY: 'auto'

      \}\}>

        \{/\* Header \*/\}

        <div style=\{\{ padding: '22px 24px 18px', borderBottom: '1px solid rgba\(255,255,255,0\.07\)', background: '\#13132a', position: 'sticky', top: 0, zIndex: 10 \}\}>

          <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start' \}\}>

            <div>

              <div style=\{\{ fontSize: 18, fontWeight: 900, color: '\#fff', marginBottom: 2 \}\}>📅 \{label\}</div>

              <div style=\{\{ fontSize: 11, color: '\#555' \}\}>\{posts\.length\} post\{posts\.length \!== 1 ? 's' : ''\} · \{dayData\.tasks\.length\} task\{dayData\.tasks\.length \!== 1 ? 's' : ''\}</div>

            </div>

            <button onClick=\{onClose\} style=\{\{ background: 'rgba\(255,255,255,0\.06\)', border: 'none', color: '\#888', fontSize: 18, cursor: 'pointer', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' \}\}>✕</button>

          </div>

        </div>

        <div style=\{\{ padding: '20px 24px', flex: 1 \}\}>

          \{/\* Scheduled Posts \*/\}

          \{posts\.length > 0 && \(

            <div style=\{\{ marginBottom: 24 \}\}>

              <div style=\{\{ fontSize: 10, fontWeight: 700, color: '\#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 \}\}>📣 Posts</div>

              \{posts\.map\(p => \(

                <div key=\{p\.id\} style=\{\{ background: 'rgba\(255,255,255,0\.04\)', border: \`1px solid $\{STATUS\_COLORS\[p\.status\]\}30\`, borderLeft: \`3px solid $\{STATUS\_COLORS\[p\.status\]\}\`, borderRadius: 10, padding: 14, marginBottom: 10 \}\}>

                  <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start', marginBottom: 8 \}\}>

                    <div>

                      <div style=\{\{ fontSize: 13, fontWeight: 800, color: '\#fff', marginBottom: 4 \}\}>\{p\.title || 'Untitled Post'\}</div>

                      <div style=\{\{ display: 'flex', gap: 6 \}\}>

                        <span style=\{\{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: STATUS\_COLORS\[p\.status\] \+ '25', color: STATUS\_COLORS\[p\.status\] \}\}>\{p\.status\}</span>

                        <span style=\{\{ fontSize: 9, padding: '2px 7px', borderRadius: 6, background: 'rgba\(255,255,255,0\.06\)', color: '\#666' \}\}>\{p\.post\_type\}</span>

                        <span style=\{\{ fontSize: 9, padding: '2px 7px', borderRadius: 6, background: 'rgba\(255,255,255,0\.04\)', color: '\#555' \}\}>\{p\.platforms\}</span>

                      </div>

                    </div>

                    <button onClick=\{\(\) => deletePost\(p\.id\)\} disabled=\{deletingPost === p\.id\} style=\{\{ background: 'none', border: 'none', color: '\#e74c3c', cursor: 'pointer', fontSize: 14, opacity: 0\.7 \}\}>🗑</button>

                  </div>

                  <div style=\{\{ fontSize: 11, color: '\#888', lineHeight: 1\.6, display: '\-webkit\-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' \}\}>\{p\.content\}</div>

                  \{p\.image\_url && <img src=\{p\.image\_url\} alt="" style=\{\{ width: '100%', borderRadius: 8, marginTop: 8, maxHeight: 140, objectFit: 'cover' \}\} onError=\{e => e\.target\.style\.display = 'none'\} />\}

                  <div style=\{\{ display: 'flex', gap: 12, marginTop: 8, fontSize: 10, color: '\#555' \}\}>

                    \{p\.reach > 0 && <span>👁 \{p\.reach\}</span>\}

                    \{p\.likes > 0 && <span>❤️ \{p\.likes\}</span>\}

                    \{p\.scheduled\_time && <span>🕐 \{p\.scheduled\_time\}</span>\}

                  </div>

                </div>

              \)\)\}

            </div>

          \)\}

          \{/\* Tasks \*/\}

          <div style=\{\{ marginBottom: 24 \}\}>

            <div style=\{\{ fontSize: 10, fontWeight: 700, color: '\#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 \}\}>✅ Tasks</div>

            \{dayData\.tasks\.length === 0 && \(

              <div style=\{\{ fontSize: 12, color: '\#333', fontStyle: 'italic', marginBottom: 10 \}\}>No tasks for this day yet\.</div>

            \)\}

            \{dayData\.tasks\.map\(task => \(

              <div key=\{task\.id\} style=\{\{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: 'rgba\(255,255,255,0\.03\)', borderRadius: 8, marginBottom: 6, border: \`1px solid $\{task\.color\}20\` \}\}>

                <div onClick=\{\(\) => toggleTask\(task\.id\)\} style=\{\{ width: 16, height: 16, borderRadius: 4, border: \`2px solid $\{task\.color\}\`, background: task\.done ? task\.color : 'transparent', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '\#fff' \}\}>

                  \{task\.done ? '✓' : ''\}

                </div>

                <span style=\{\{ flex: 1, fontSize: 12, color: task\.done ? '\#444' : '\#ddd', textDecoration: task\.done ? 'line\-through' : 'none', lineHeight: 1\.4 \}\}>\{task\.text\}</span>

                <button onClick=\{\(\) => deleteTask\(task\.id\)\} style=\{\{ background: 'none', border: 'none', color: '\#555', cursor: 'pointer', fontSize: 12 \}\}>✕</button>

              </div>

            \)\)\}

            \{/\* Add Task \*/\}

            <div style=\{\{ display: 'flex', gap: 7, marginTop: 8, alignItems: 'center' \}\}>

              <div style=\{\{ display: 'flex', gap: 4 \}\}>

                \{TASK\_COLORS\.map\(c => \(

                  <div key=\{c\} onClick=\{\(\) => setTaskColor\(c\)\} style=\{\{ width: 16, height: 16, borderRadius: '50%', background: c, cursor: 'pointer', border: taskColor === c ? '2px solid \#fff' : '2px solid transparent', flexShrink: 0 \}\} />

                \)\)\}

              </div>

              <input value=\{newTask\} onChange=\{e => setNewTask\(e\.target\.value\)\} onKeyDown=\{e => e\.key === 'Enter' && addTask\(\)\}

                placeholder="Add a task and press Enter\.\.\."

                style=\{\{ flex: 1, background: 'rgba\(0,0,0,0\.3\)', border: '1px solid rgba\(255,255,255,0\.1\)', color: '\#fff', borderRadius: 8, padding: '9px 12px', fontSize: 12, fontFamily: 'inherit' \}\} />

              <button onClick=\{addTask\} style=\{\{ background: taskColor, border: 'none', color: '\#fff', borderRadius: 8, padding: '9px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer' \}\}>\+</button>

            </div>

          </div>

          \{/\* Notes \*/\}

          <div>

            <div style=\{\{ fontSize: 10, fontWeight: 700, color: '\#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 \}\}>📝 Notes</div>

            <textarea

              value=\{dayData\.note\}

              onChange=\{e => updateNote\(e\.target\.value\)\}

              placeholder="Jot down ideas, reminders, or content notes for this day\.\.\."

              rows=\{6\}

              style=\{\{ width: '100%', background: 'rgba\(0,0,0,0\.3\)', border: '1px solid rgba\(255,255,255,0\.1\)', color: '\#ddd', borderRadius: 10, padding: '12px 14px', fontSize: 12, lineHeight: 1\.7, resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border\-box' \}\}

            />

            <div style=\{\{ fontSize: 10, color: '\#333', marginTop: 4 \}\}>Auto\-saved to local storage</div>

          </div>

        </div>

      </div>

    </div>

  \);

\}

// ── Main Calendar ─────────────────────────────────────────────────────────────

export default function ContentCalendar\(\{ posts, onRefresh \}\) \{

  const today = new Date\(\);

  const \[currentYear, setCurrentYear\] = useState\(today\.getFullYear\(\)\);

  const \[currentMonth, setCurrentMonth\] = useState\(today\.getMonth\(\)\);

  const \[weekOffset, setWeekOffset\] = useState\(0\); // weeks from today for week view

  const \[selectedDate, setSelectedDate\] = useState\(null\);

  const \[fullscreen, setFullscreen\] = useState\(false\);

  const \[view, setView\] = useState\('month'\); // month | week

  const \[slideDir, setSlideDir\] = useState\(null\); // 'left' | 'right' for animation

  const \[showMonthPicker, setShowMonthPicker\] = useState\(false\);

  const \[, forceUpdate\] = useState\(0\);

  const todayStr = toDateStr\(today\.getFullYear\(\), today\.getMonth\(\), today\.getDate\(\)\);

  const firstDay = new Date\(currentYear, currentMonth, 1\)\.getDay\(\);

  const daysInMonth = new Date\(currentYear, currentMonth \+ 1, 0\)\.getDate\(\);

  const navigate = \(dir\) => \{

    setSlideDir\(dir > 0 ? 'left' : 'right'\);

    setTimeout\(\(\) => setSlideDir\(null\), 320\);

    if \(view === 'week'\) \{

      setWeekOffset\(w => w \+ dir\);

      return;

    \}

    if \(dir > 0\) \{

      if \(currentMonth === 11\) \{ setCurrentMonth\(0\); setCurrentYear\(y => y \+ 1\); \}

      else setCurrentMonth\(m => m \+ 1\);

    \} else \{

      if \(currentMonth === 0\) \{ setCurrentMonth\(11\); setCurrentYear\(y => y \- 1\); \}

      else setCurrentMonth\(m => m \- 1\);

    \}

  \};

  const prevMonth = \(\) => navigate\(\-1\);

  const nextMonth = \(\) => navigate\(1\);

  const goToday = \(\) => \{

    setCurrentMonth\(today\.getMonth\(\)\);

    setCurrentYear\(today\.getFullYear\(\)\);

    setWeekOffset\(0\);

  \};

  // Keyboard navigation

  useEffect\(\(\) => \{

    const handler = \(e\) => \{

      if \(e\.target\.tagName === 'INPUT' || e\.target\.tagName === 'TEXTAREA'\) return;

      if \(e\.key === 'ArrowLeft'\) navigate\(\-1\);

      if \(e\.key === 'ArrowRight'\) navigate\(1\);

      if \(e\.key === 'Escape'\) \{ setSelectedDate\(null\); setShowMonthPicker\(false\); \}

    \};

    window\.addEventListener\('keydown', handler\);

    return \(\) => window\.removeEventListener\('keydown', handler\);

  \}, \[view, currentMonth, currentYear\]\);

  const getPostsForDay = \(day\) => \{

    const dateStr = toDateStr\(currentYear, currentMonth, day\);

    return posts\.filter\(p => \(p\.scheduled\_date || ''\)\.startsWith\(dateStr\) || \(p\.published\_at || ''\)\.startsWith\(dateStr\)\);

  \};

  const handleDayClose = \(\) => \{

    setSelectedDate\(null\);

    forceUpdate\(n => n \+ 1\); // re\-render to pick up saved tasks/notes

  \};

  // Build grid cells: nulls for leading blanks, then day numbers

  const cells = \[\];

  for \(let i = 0; i < firstDay; i\+\+\) cells\.push\(null\);

  for \(let d = 1; d <= daysInMonth; d\+\+\) cells\.push\(d\);

  // Pad to full weeks

  while \(cells\.length % 7 \!== 0\) cells\.push\(null\);

  // Week view: get week based on weekOffset from today's week start

  const getWeekDays = \(\) => \{

    const ref = new Date\(today\);

    const dow = ref\.getDay\(\);

    ref\.setDate\(ref\.getDate\(\) \- dow \+ weekOffset \* 7\);

    return Array\.from\(\{ length: 7 \}, \(\_, i\) => \{

      const d = new Date\(ref\); d\.setDate\(ref\.getDate\(\) \+ i\);

      return \{ date: d, str: toDateStr\(d\.getFullYear\(\), d\.getMonth\(\), d\.getDate\(\)\) \};

    \}\);

  \};

  const weekDays = view === 'week' ? getWeekDays\(\) : \[\];

  const weekLabel = view === 'week' && weekDays\.length === 7

    ? \`$\{MONTHS\[weekDays\[0\]\.date\.getMonth\(\)\]\.slice\(0,3\)\} $\{weekDays\[0\]\.date\.getDate\(\)\} – $\{MONTHS\[weekDays\[6\]\.date\.getMonth\(\)\]\.slice\(0,3\)\} $\{weekDays\[6\]\.date\.getDate\(\)\}, $\{weekDays\[6\]\.date\.getFullYear\(\)\}\`

    : null;

  const outer = fullscreen

    ? \{ position: 'fixed', inset: 0, zIndex: 900, background: '\#080814', display: 'flex', flexDirection: 'column' \}

    : \{ display: 'flex', flexDirection: 'column', height: '100%' \};

  const calBg = '\#080814';

  const cellBg = 'rgba\(255,255,255,0\.025\)';

  const todayBg = 'rgba\(231,76,60,0\.1\)';

  return \(

    <div style=\{outer\} onClick=\{\(\) => setShowMonthPicker\(false\)\}>

      \{/\* ── HEADER ── \*/\}

      <div style=\{\{ background: '\#0f0f1e', borderBottom: '1px solid rgba\(255,255,255,0\.07\)', padding: '14px 24px', display: 'flex', justifyContent: 'space\-between', alignItems: 'center', flexShrink: 0 \}\}>

        <div style=\{\{ display: 'flex', alignItems: 'center', gap: 16 \}\}>

          <div>

            <div style=\{\{ fontSize: 18, fontWeight: 900, color: '\#fff' \}\}>📅 Content Calendar</div>

            <div style=\{\{ fontSize: 11, color: '\#444' \}\}>\{posts\.length\} posts scheduled</div>

          </div>

          \{/\* Month/Week nav \*/\}

          <div style=\{\{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 16, position: 'relative' \}\}>

            <button onClick=\{prevMonth\} style=\{\{ background: 'rgba\(255,255,255,0\.06\)', border: '1px solid rgba\(255,255,255,0\.08\)', color: '\#ccc', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, transition: 'all 0\.15s' \}\}

              onMouseEnter=\{e => \{ e\.currentTarget\.style\.background = 'rgba\(255,255,255,0\.12\)'; e\.currentTarget\.style\.color = '\#fff'; \}\}

              onMouseLeave=\{e => \{ e\.currentTarget\.style\.background = 'rgba\(255,255,255,0\.06\)'; e\.currentTarget\.style\.color = '\#ccc'; \}\}>

              ‹

            </button>

            <button onClick=\{\(\) => setShowMonthPicker\(p => \!p\)\} style=\{\{ background: 'rgba\(255,255,255,0\.06\)', border: '1px solid rgba\(255,255,255,0\.08\)', color: '\#fff', borderRadius: 8, padding: '6px 18px', fontSize: 15, fontWeight: 900, cursor: 'pointer', minWidth: 200, textAlign: 'center', transition: 'all 0\.15s' \}\}

              onMouseEnter=\{e => e\.currentTarget\.style\.background = 'rgba\(255,255,255,0\.1\)'\}

              onMouseLeave=\{e => e\.currentTarget\.style\.background = 'rgba\(255,255,255,0\.06\)'\}>

              \{view === 'week' ? weekLabel : \`$\{MONTHS\[currentMonth\]\} $\{currentYear\}\`\}

              <span style=\{\{ fontSize: 10, marginLeft: 6, opacity: 0\.5 \}\}>▾</span>

            </button>

            <button onClick=\{nextMonth\} style=\{\{ background: 'rgba\(255,255,255,0\.06\)', border: '1px solid rgba\(255,255,255,0\.08\)', color: '\#ccc', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, transition: 'all 0\.15s' \}\}

              onMouseEnter=\{e => \{ e\.currentTarget\.style\.background = 'rgba\(255,255,255,0\.12\)'; e\.currentTarget\.style\.color = '\#fff'; \}\}

              onMouseLeave=\{e => \{ e\.currentTarget\.style\.background = 'rgba\(255,255,255,0\.06\)'; e\.currentTarget\.style\.color = '\#ccc'; \}\}>

              ›

            </button>

            \{/\* Month/Year Picker Dropdown \*/\}

            \{showMonthPicker && view === 'month' && \(

              <div style=\{\{ position: 'absolute', top: 44, left: 44, background: '\#1a1a2e', border: '1px solid rgba\(255,255,255,0\.12\)', borderRadius: 14, padding: 16, zIndex: 500, boxShadow: '0 8px 40px rgba\(0,0,0,0\.6\)', width: 280 \}\}

                onClick=\{e => e\.stopPropagation\(\)\}>

                \{/\* Year selector \*/\}

                <div style=\{\{ display: 'flex', alignItems: 'center', justifyContent: 'space\-between', marginBottom: 12 \}\}>

                  <button onClick=\{\(\) => setCurrentYear\(y => y \- 1\)\} style=\{\{ background: 'rgba\(255,255,255,0\.06\)', border: 'none', color: '\#aaa', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 14 \}\}>‹</button>

                  <span style=\{\{ color: '\#fff', fontWeight: 900, fontSize: 16 \}\}>\{currentYear\}</span>

                  <button onClick=\{\(\) => setCurrentYear\(y => y \+ 1\)\} style=\{\{ background: 'rgba\(255,255,255,0\.06\)', border: 'none', color: '\#aaa', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 14 \}\}>›</button>

                </div>

                \{/\* Month grid \*/\}

                <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(4, 1fr\)', gap: 6 \}\}>

                  \{MONTHS\.map\(\(m, i\) => \(

                    <button key=\{m\} onClick=\{\(\) => \{ setCurrentMonth\(i\); setShowMonthPicker\(false\); \}\} style=\{\{

                      padding: '7px 4px', borderRadius: 8, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer',

                      background: i === currentMonth ? '\#e74c3c' : 'rgba\(255,255,255,0\.05\)',

                      color: i === currentMonth ? '\#fff' : '\#888',

                    \}\}>\{m\.slice\(0, 3\)\}</button>

                  \)\)\}

                </div>

                <button onClick=\{goToday\} style=\{\{ width: '100%', marginTop: 10, background: 'rgba\(255,255,255,0\.06\)', border: 'none', color: '\#aaa', borderRadius: 8, padding: '8px', fontSize: 11, fontWeight: 700, cursor: 'pointer' \}\}>Jump to Today</button>

              </div>

            \)\}

          </div>

        </div>

        <div style=\{\{ display: 'flex', gap: 8, alignItems: 'center' \}\}>

          \{/\* View toggle \*/\}

          <div style=\{\{ display: 'flex', background: 'rgba\(255,255,255,0\.05\)', borderRadius: 9, padding: 3, gap: 2 \}\}>

            \{\['month', 'week'\]\.map\(v => \(

              <button key=\{v\} onClick=\{\(\) => setView\(v\)\} style=\{\{ padding: '5px 14px', borderRadius: 7, border: 'none', background: view === v ? '\#e74c3c' : 'transparent', color: view === v ? '\#fff' : '\#555', fontWeight: 700, fontSize: 11, cursor: 'pointer', textTransform: 'capitalize' \}\}>\{v\}</button>

            \)\)\}

          </div>

          <button onClick=\{goToday\} style=\{\{ background: 'rgba\(255,255,255,0\.06\)', border: '1px solid rgba\(255,255,255,0\.1\)', color: '\#aaa', borderRadius: 8, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer' \}\}>Today</button>

          <button onClick=\{\(\) => setFullscreen\(f => \!f\)\} style=\{\{ background: fullscreen ? 'rgba\(231,76,60,0\.2\)' : 'rgba\(255,255,255,0\.06\)', border: \`1px solid $\{fullscreen ? '\#e74c3c40' : 'rgba\(255,255,255,0\.1\)'\}\`, color: fullscreen ? '\#e74c3c' : '\#aaa', borderRadius: 8, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer' \}\}>

            \{fullscreen ? '⊠ Exit Fullscreen' : '⊞ Fullscreen'\}

          </button>

        </div>

      </div>

      \{/\* ── LEGEND ── \*/\}

      <div style=\{\{ background: '\#0a0a1a', borderBottom: '1px solid rgba\(255,255,255,0\.05\)', padding: '8px 24px', display: 'flex', gap: 16, flexShrink: 0 \}\}>

        \{Object\.entries\(STATUS\_COLORS\)\.map\(\(\[status, color\]\) => \(

          <div key=\{status\} style=\{\{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '\#555' \}\}>

            <div style=\{\{ width: 8, height: 8, borderRadius: 2, background: color \}\} />

            \{status\}

          </div>

        \)\)\}

        <div style=\{\{ marginLeft: 8, display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '\#555' \}\}>

          <div style=\{\{ width: 8, height: 8, borderRadius: 2, background: '\#f39c12' \}\} />

          Has Tasks

        </div>

        <div style=\{\{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' \}\}>

          <span style=\{\{ fontSize: 10, color: '\#333' \}\}>Click any day to edit</span>

          <span style=\{\{ fontSize: 10, color: '\#2a2a3a', background: 'rgba\(255,255,255,0\.04\)', borderRadius: 5, padding: '2px 7px' \}\}>← → arrow keys to navigate</span>

        </div>

      </div>

      \{/\* ── MONTH VIEW ── \*/\}

      \{view === 'month' && \(

        <div style=\{\{ flex: 1, overflow: 'auto', background: calBg, padding: 16 \}\}>

          \{/\* Day headers \*/\}

          <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(7, 1fr\)', gap: 4, marginBottom: 4 \}\}>

            \{DAYS\.map\(d => \(

              <div key=\{d\} style=\{\{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: '\#444', padding: '6px 0', textTransform: 'uppercase', letterSpacing: 1 \}\}>\{d\}</div>

            \)\)\}

          </div>

          \{/\* Day cells \*/\}

          <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(7, 1fr\)', gap: 4, gridAutoRows: fullscreen ? '1fr' : '120px' \}\}>

            \{cells\.map\(\(day, idx\) => \{

              if \(\!day\) return <div key=\{idx\} style=\{\{ background: 'rgba\(255,255,255,0\.01\)', borderRadius: 8, opacity: 0\.3 \}\} />;

              const dateStr = toDateStr\(currentYear, currentMonth, day\);

              const isToday = dateStr === todayStr;

              const dayPosts = getPostsForDay\(day\);

              const dayData = getDayData\(dateStr\);

              const hasTasks = dayData\.tasks\.length > 0;

              const hasNote = \!\!dayData\.note?\.trim\(\);

              const doneTasks = dayData\.tasks\.filter\(t => t\.done\)\.length;

              return \(

                <div key=\{idx\}

                  onClick=\{\(\) => setSelectedDate\(dateStr\)\}

                  style=\{\{

                    background: isToday ? todayBg : cellBg,

                    border: isToday ? '1\.5px solid rgba\(231,76,60,0\.5\)' : '1px solid rgba\(255,255,255,0\.05\)',

                    borderRadius: 10, padding: '8px 8px 6px', cursor: 'pointer', transition: 'all 0\.12s',

                    display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 100,

                  \}\}

                  onMouseEnter=\{e => e\.currentTarget\.style\.borderColor = 'rgba\(255,255,255,0\.2\)'\}

                  onMouseLeave=\{e => e\.currentTarget\.style\.borderColor = isToday ? 'rgba\(231,76,60,0\.5\)' : 'rgba\(255,255,255,0\.05\)'\}

                >

                  \{/\* Date number \+ badges \*/\}

                  <div style=\{\{ display: 'flex', justifyContent: 'space\-between', alignItems: 'flex\-start', marginBottom: 5 \}\}>

                    <div style=\{\{

                      width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',

                      background: isToday ? '\#e74c3c' : 'transparent',

                      fontSize: 12, fontWeight: isToday ? 900 : 600,

                      color: isToday ? '\#fff' : '\#888', flexShrink: 0,

                    \}\}>\{day\}</div>

                    <div style=\{\{ display: 'flex', gap: 3 \}\}>

                      \{hasTasks && <div style=\{\{ fontSize: 8, background: '\#f39c1222', color: '\#f39c12', borderRadius: 4, padding: '1px 5px', fontWeight: 700 \}\}>\{doneTasks\}/\{dayData\.tasks\.length\}</div>\}

                      \{hasNote && <div style=\{\{ fontSize: 9, color: '\#555' \}\}>📝</div>\}

                    </div>

                  </div>

                  \{/\* Posts \*/\}

                  <div style=\{\{ flex: 1, overflow: 'hidden' \}\}>

                    \{dayPosts\.slice\(0, 3\)\.map\(p => \{

                      const pf = \(p\.platforms || ''\)\.split\(','\)\[0\]?\.trim\(\)\.toLowerCase\(\);

                      return \(

                        <div key=\{p\.id\} style=\{\{

                          fontSize: 9, padding: '2px 5px', marginBottom: 2, borderRadius: 4,

                          background: STATUS\_COLORS\[p\.status\] \+ '20', color: STATUS\_COLORS\[p\.status\],

                          fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',

                          borderLeft: \`2px solid $\{PLATFORM\_COLORS\[pf\] || STATUS\_COLORS\[p\.status\]\}\`,

                        \}\}>

                          \{p\.title || p\.post\_type || 'Post'\}

                        </div>

                      \);

                    \}\)\}

                    \{dayPosts\.length > 3 && <div style=\{\{ fontSize: 8, color: '\#555', paddingLeft: 4 \}\}>\+\{dayPosts\.length \- 3\} more</div>\}

                  </div>

                  \{/\* Task dots \*/\}

                  \{hasTasks && \(

                    <div style=\{\{ display: 'flex', gap: 2, marginTop: 4, flexWrap: 'wrap' \}\}>

                      \{dayData\.tasks\.slice\(0, 5\)\.map\(t => \(

                        <div key=\{t\.id\} style=\{\{ width: 5, height: 5, borderRadius: '50%', background: t\.done ? '\#333' : t\.color, opacity: t\.done ? 0\.4 : 1 \}\} />

                      \)\)\}

                    </div>

                  \)\}

                </div>

              \);

            \}\)\}

          </div>

        </div>

      \)\}

      \{/\* ── WEEK VIEW ── \*/\}

      \{view === 'week' && \(

        <div style=\{\{ flex: 1, overflow: 'auto', background: calBg, padding: 16 \}\}>

          <div style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(7, 1fr\)', gap: 8 \}\}>

            \{weekDays\.map\(\(\{ date, str \}\) => \{

              const dayPosts = posts\.filter\(p => \(p\.scheduled\_date || ''\)\.startsWith\(str\) || \(p\.published\_at || ''\)\.startsWith\(str\)\);

              const dayData = getDayData\(str\);

              const isToday = str === todayStr;

              return \(

                <div key=\{str\} style=\{\{ display: 'flex', flexDirection: 'column', gap: 0 \}\}>

                  \{/\* Header \*/\}

                  <div onClick=\{\(\) => setSelectedDate\(str\)\} style=\{\{

                    textAlign: 'center', padding: '10px 6px', borderRadius: '10px 10px 0 0', cursor: 'pointer',

                    background: isToday ? '\#e74c3c' : 'rgba\(255,255,255,0\.05\)',

                    borderBottom: '1px solid rgba\(255,255,255,0\.05\)'

                  \}\}>

                    <div style=\{\{ fontSize: 10, fontWeight: 700, color: isToday ? '\#fff' : '\#555', textTransform: 'uppercase' \}\}>\{DAYS\[date\.getDay\(\)\]\}</div>

                    <div style=\{\{ fontSize: 22, fontWeight: 900, color: isToday ? '\#fff' : '\#aaa', lineHeight: 1\.2 \}\}>\{date\.getDate\(\)\}</div>

                    <div style=\{\{ fontSize: 9, color: isToday ? 'rgba\(255,255,255,0\.7\)' : '\#444' \}\}>\{MONTHS\[date\.getMonth\(\)\]\.slice\(0, 3\)\}</div>

                  </div>

                  \{/\* Content \*/\}

                  <div onClick=\{\(\) => setSelectedDate\(str\)\} style=\{\{

                    flex: 1, minHeight: 400, background: isToday ? 'rgba\(231,76,60,0\.05\)' : 'rgba\(255,255,255,0\.02\)',

                    border: \`1px solid $\{isToday ? 'rgba\(231,76,60,0\.2\)' : 'rgba\(255,255,255,0\.05\)'\}\`,

                    borderTop: 'none', borderRadius: '0 0 10px 10px', padding: 8, cursor: 'pointer'

                  \}\}>

                    \{dayPosts\.map\(p => \(

                      <div key=\{p\.id\} style=\{\{ fontSize: 10, padding: '4px 7px', marginBottom: 4, borderRadius: 6, background: STATUS\_COLORS\[p\.status\] \+ '20', color: STATUS\_COLORS\[p\.status\], fontWeight: 700, lineHeight: 1\.3 \}\}>

                        \{p\.scheduled\_time && <span style=\{\{ opacity: 0\.7 \}\}>\{p\.scheduled\_time\} · </span>\}

                        \{p\.title || p\.post\_type\}

                      </div>

                    \)\)\}

                    \{dayData\.tasks\.map\(t => \(

                      <div key=\{t\.id\} style=\{\{ fontSize: 10, padding: '3px 7px', marginBottom: 3, borderRadius: 6, background: \`$\{t\.color\}15\`, borderLeft: \`2px solid $\{t\.color\}\`, color: '\#aaa', textDecoration: t\.done ? 'line\-through' : 'none', opacity: t\.done ? 0\.5 : 1 \}\}>

                        \{t\.text\}

                      </div>

                    \)\)\}

                    \{dayData\.note?\.trim\(\) && \(

                      <div style=\{\{ fontSize: 9, color: '\#444', marginTop: 4, fontStyle: 'italic', lineHeight: 1\.5 \}\}>

                        \{dayData\.note\.slice\(0, 80\)\}\{dayData\.note\.length > 80 ? '\.\.\.' : ''\}

                      </div>

                    \)\}

                    \{dayPosts\.length === 0 && dayData\.tasks\.length === 0 && \!dayData\.note && \(

                      <div style=\{\{ textAlign: 'center', paddingTop: 40, fontSize: 11, color: '\#222' \}\}>\+ Add</div>

                    \)\}

                  </div>

                </div>

              \);

            \}\)\}

          </div>

        </div>

      \)\}

      \{/\* ── DAY DETAIL PANEL ── \*/\}

      \{selectedDate && \(

        <DayPanel

          dateStr=\{selectedDate\}

          posts=\{posts\.filter\(p => \(p\.scheduled\_date || ''\)\.startsWith\(selectedDate\) || \(p\.published\_at || ''\)\.startsWith\(selectedDate\)\)\}

          onClose=\{handleDayClose\}

          onRefresh=\{onRefresh\}

        />

      \)\}

    </div>

  \);

\}
