# New Microsoft Word Document (94)

Source: New Microsoft Word Document (94).docx

import { useState } from 'react';

import { Users, CheckCircle, Lock } from 'lucide-react';

const NAVY = '#0B1F45';

const GOLD = '#D4A843';

const GREEN = '#27ae60';

const ROLES = {

  admin: {

    name: 'Administrator',

    description: 'Full access to all features and settings',

    permissions: ['call_initiate', 'lead_manage', 'data_export', 'user_manage', 'billing', 'audit_logs', 'recordings_access'],

    color: '#e74c3c',

  },

  supervisor: {

    name: 'Supervisor',

    description: 'Monitor agents, access reports, manage leads',

    permissions: ['call_initiate', 'lead_manage', 'data_export', 'recordings_access', 'agent_monitor'],

    color: '#f39c12',

  },

  agent: {

    name: 'Agent',

    description: 'Make calls, log outcomes, view own leads',

    permissions: ['call_initiate', 'lead_view', 'recordings_access'],

    color: '#3498db',

  },

  viewer: {

    name: 'Viewer',

    description: 'Read-only access to dashboards and reports',

    permissions: ['data_view'],

    color: '#95a5a6',

  },

};

export default function RoleBasedAccessControl() {

  const [teamMembers, setTeamMembers] = useState([

    { id: 1, email: 'jacob@homelink.com', role: 'admin', status: 'active' },

    { id: 2, email: 'agent1@homelink.com', role: 'agent', status: 'active' },

    { id: 3, email: 'supervisor@homelink.com', role: 'supervisor', status: 'active' },

  ]);

  const [selectedRole, setSelectedRole] = useState('agent');

  function updateUserRole(userId, newRole) {

    setTeamMembers(members =>

      members.map(m => m.id === userId ? { ...m, role: newRole } : m)

    );

  }

  return (

    <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>

        <Users size={20} color={GOLD} />

        <h2 style={{ fontSize: 18, fontWeight: 900, color: NAVY, margin: 0 }}>Role-Based Access Control</h2>

      </div>

      {/* ROLE DEFINITIONS */}

      <div style={{ marginBottom: 24 }}>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 12 }}>Available Roles</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>

          {Object.entries(ROLES).map(([key, role]) => (

            <div

              key={key}

              style={{

                border: selectedRole === key ? `2px solid ${GOLD}` : '1px solid #e0e0e0',

                borderRadius: 10,

                padding: 12,

                cursor: 'pointer',

                background: selectedRole === key ? '#fffbeb' : '#fff',

                transition: 'all 0.15s',

              }}

              onClick={() => setSelectedRole(key)}>

              <div style={{

                display: 'flex',

                alignItems: 'center',

                gap: 8,

                marginBottom: 6,

              }}>

                <div

                  style={{

                    width: 10,

                    height: 10,

                    borderRadius: '50%',

                    background: role.color,

                  }}

                />

                <span style={{ fontWeight: 900, fontSize: 12, color: NAVY }}>

                  {role.name}

                </span>

              </div>

              <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>

                {role.description}

              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>

                {role.permissions.slice(0, 3).map(perm => (

                  <span key={perm} style={{

                    background: '#f0f0f0',

                    padding: '2px 6px',

                    borderRadius: 3,

                    fontSize: 9,

                    fontWeight: 700,

                    color: '#666',

                  }}>

                    {perm.replace('_', ' ')}

                  </span>

                ))}

                {role.permissions.length > 3 && (

                  <span style={{

                    background: '#f0f0f0',

                    padding: '2px 6px',

                    borderRadius: 3,

                    fontSize: 9,

                    fontWeight: 700,

                    color: '#666',

                  }}>

                    +{role.permissions.length - 3}

                  </span>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* SELECTED ROLE DETAILS */}

      {selectedRole && (

        <div style={{

          background: '#f8f9fa',

          border: `2px solid ${ROLES[selectedRole].color}`,

          borderRadius: 10,

          padding: 14,

          marginBottom: 20,

        }}>

          <div style={{ fontWeight: 900, color: NAVY, marginBottom: 10 }}>

            {ROLES[selectedRole].name} - Permissions

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>

            {ROLES[selectedRole].permissions.map(perm => (

              <div key={perm} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>

                <CheckCircle size={14} color={GREEN} />

                <span>{perm.replace('_', ' ')}</span>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* TEAM MEMBERS */}

      <div>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#333', marginBottom: 12 }}>Team Members</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

          {teamMembers.map(member => (

            <div

              key={member.id}

              style={{

                display: 'flex',

                alignItems: 'center',

                justifyContent: 'space-between',

                background: '#f9f9f9',

                border: '1px solid #e0e0e0',

                borderRadius: 8,

                padding: 12,

              }}>

              <div style={{ flex: 1 }}>

                <div style={{ fontWeight: 700, fontSize: 12, color: NAVY, marginBottom: 2 }}>

                  {member.email}

                </div>

                <div style={{ fontSize: 11, color: '#666' }}>

                  Role: {ROLES[member.role].name}

                </div>

              </div>

              <select

                value={member.role}

                onChange={(e) => updateUserRole(member.id, e.target.value)}

                style={{

                  padding: '6px 10px',

                  border: `2px solid ${ROLES[member.role].color}`,

                  borderRadius: 6,

                  fontSize: 11,

                  fontWeight: 700,

                  cursor: 'pointer',

                  background: '#fff',

                }}>

                {Object.entries(ROLES).map(([key, role]) => (

                  <option key={key} value={key}>{role.name}</option>

                ))}

              </select>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}
