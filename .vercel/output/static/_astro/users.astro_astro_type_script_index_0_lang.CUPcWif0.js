import{t as e}from"./supabase.ohim4gXv.js";var t=document.getElementById(`users-table-body`),n=document.getElementById(`alert-container`),r=document.getElementById(`add-user-form`),i=document.getElementById(`modal-submit-btn`),a=document.getElementById(`modal-btn-text`),o=document.getElementById(`modal-btn-spinner`),s=document.getElementById(`modal-alert-container`),c=document.getElementById(`edit-user-form`),l=document.getElementById(`edit-modal-submit-btn`),u=document.getElementById(`edit-modal-btn-text`),d=document.getElementById(`edit-modal-btn-spinner`),f=document.getElementById(`edit-modal-alert-container`);function p(e,t,n){e&&(e.innerHTML=`
      <div class="alert alert-${n} alert-dismissible fade show border-0 rounded-3" role="alert">
        <i class="bi ${n===`danger`?`bi-exclamation-triangle-fill`:`bi-check-circle-fill`} me-2"></i>
        ${t}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `)}async function m(){let{data:{session:t}}=await e.auth.getSession();if(!t||!t.user){window.location.href=`/admin/login`;return}let{data:n}=await e.from(`profiles`).select(`role`).eq(`id`,t.user.id).single();if(n?.role!==`super_admin`){alert(`Access Denied: Only the Super Admin can access the user management page.`),window.location.href=`/admin`;return}h()}async function h(){try{let{data:{session:r}}=await e.auth.getSession();if(!r)return;let i=await fetch(`/api/admin/users`,{headers:{Authorization:`Bearer ${r.access_token}`}}),a=await i.json();if(!i.ok||!a.success){p(n,a.error||`Failed to load user accounts`,`danger`),t&&(t.innerHTML=`<tr><td colspan="8" class="text-center text-danger py-4">Error: ${a.error||`Unauthorized`}</td></tr>`);return}let o=a.data;t&&(o.length===0?t.innerHTML=`<tr><td colspan="8" class="text-center py-4 text-muted">No accounts registered yet.</td></tr>`:(t.innerHTML=o.map(e=>`
            <tr>
              <td>
                <div class="fw-bold text-dark">${e.full_name||`N/A`}</div>
              </td>
              <td>
                <div class="text-muted small">${e.email||`No email`}</div>
                <div class="font-monospace text-muted small" style="font-size: 0.7rem;">ID: ${e.id}</div>
              </td>
              <td>${e.phone||`<span class="text-muted">-</span>`}</td>
              <td>
                <code class="text-muted" style="font-size: 0.85rem;">••••••••</code>
              </td>
              <td>
                <span class="badge rounded-pill fw-semibold py-1.5 px-3 ${e.role===`super_admin`?`bg-success-light text-success`:e.role===`admin`?`bg-danger-light text-danger`:`bg-primary-light text-primary`}">
                  ${e.role.toUpperCase()}
                </span>
              </td>
              <td>
                <div class="text-muted text-truncate small" style="max-width: 150px;" title="${e.shipping_address||``}">
                  ${e.shipping_address||`<span class="text-muted">-</span>`}
                </div>
              </td>
              <td class="small text-muted">${new Date(e.created_at).toLocaleDateString()}</td>
              <td class="text-end">
                <div class="d-flex justify-content-end gap-2">
                  <button class="btn btn-sm btn-outline-primary edit-user-btn" 
                          data-id="${e.id}" 
                          data-name="${e.full_name}" 
                          data-email="${e.email}" 
                          data-phone="${e.phone}" 
                          data-role="${e.role}" 
                          data-address="${e.shipping_address||``}" 
                          title="Edit Account">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger delete-user-btn" 
                          data-id="${e.id}" 
                          data-name="${e.full_name}" 
                          title="Delete Account">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `).join(``),document.querySelectorAll(`.edit-user-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget,n=t.getAttribute(`data-id`)||``,r=t.getAttribute(`data-name`)||``,i=t.getAttribute(`data-email`)||``,a=t.getAttribute(`data-phone`)||``,o=t.getAttribute(`data-role`)||`customer`,s=t.getAttribute(`data-address`)||``;document.getElementById(`edit-id`).value=n,document.getElementById(`edit-fullName`).value=r,document.getElementById(`edit-email`).value=i,document.getElementById(`edit-phone`).value=a,document.getElementById(`edit-role`).value=o,document.getElementById(`edit-address`).value=s,document.getElementById(`edit-password`).value=``,new window.bootstrap.Modal(document.getElementById(`editUserModal`)).show()})}),document.querySelectorAll(`.delete-user-btn`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=e.currentTarget,n=t.getAttribute(`data-id`)||``,r=t.getAttribute(`data-name`)||``;confirm(`Are you sure you want to delete the account for ${r}? This action cannot be undone.`)&&await g(n,r)})})))}catch(e){console.error(e),p(n,`An error occurred while fetching user list.`,`danger`)}}async function g(t,r){try{let{data:{session:i}}=await e.auth.getSession();if(!i)return;let a=await fetch(`/api/admin/users`,{method:`DELETE`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${i.access_token}`},body:JSON.stringify({id:t})}),o=await a.json();if(!a.ok||!o.success){p(n,o.error||`Failed to delete account`,`danger`);return}p(n,`User account for <strong>${r}</strong> has been deleted.`,`success`),h()}catch(e){console.error(e),p(n,`An error occurred during account deletion.`,`danger`)}}r?.addEventListener(`submit`,async t=>{t.preventDefault(),i&&(i.disabled=!0),a?.classList.add(`d-none`),o?.classList.remove(`d-none`),s&&(s.innerHTML=``);let c=document.getElementById(`modal-fullName`).value.trim(),l=document.getElementById(`modal-email`).value.trim(),u=document.getElementById(`modal-password`).value,d=document.getElementById(`modal-phone`).value.trim(),f=document.getElementById(`modal-address`).value.trim();try{let{data:{session:t}}=await e.auth.getSession();if(!t)throw Error(`No active session`);let i=await fetch(`/api/admin/users`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${t.access_token}`},body:JSON.stringify({email:l,password:u,full_name:c,phone:d,shipping_address:f,role:`admin`})}),a=await i.json();if(!i.ok||!a.success){p(s,a.error||`Failed to create admin user`,`danger`);return}p(n,`Admin account for <strong>${c}</strong> created successfully!`,`success`),r.reset();let o=document.getElementById(`addUserModal`);window.bootstrap.Modal.getInstance(o)?.hide(),h()}catch(e){console.error(e),p(s,`An error occurred while creating the account.`,`danger`)}finally{i&&(i.disabled=!1),a?.classList.remove(`d-none`),o?.classList.add(`d-none`)}}),c?.addEventListener(`submit`,async t=>{t.preventDefault(),l&&(l.disabled=!0),u?.classList.add(`d-none`),d?.classList.remove(`d-none`),f&&(f.innerHTML=``);let r=document.getElementById(`edit-id`).value,i=document.getElementById(`edit-fullName`).value.trim(),a=document.getElementById(`edit-password`).value,o=document.getElementById(`edit-phone`).value.trim(),s=document.getElementById(`edit-role`).value,c=document.getElementById(`edit-address`).value.trim();try{let{data:{session:t}}=await e.auth.getSession();if(!t)throw Error(`No active session`);let l=await fetch(`/api/admin/users`,{method:`PUT`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${t.access_token}`},body:JSON.stringify({id:r,password:a||void 0,full_name:i,phone:o,role:s,shipping_address:c})}),u=await l.json();if(!l.ok||!u.success){p(f,u.error||`Failed to update account`,`danger`);return}p(n,`User account for <strong>${i}</strong> updated successfully!`,`success`);let d=document.getElementById(`editUserModal`);window.bootstrap.Modal.getInstance(d)?.hide(),h()}catch(e){console.error(e),p(f,`An error occurred while updating the account.`,`danger`)}finally{l&&(l.disabled=!1),u?.classList.remove(`d-none`),d?.classList.add(`d-none`)}}),m();