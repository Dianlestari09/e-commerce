import{t as e}from"./supabase.ohim4gXv.js";window.supabase=e;async function t(){let t=document.getElementById(`auth-header`),n=document.getElementById(`auth-actions`),r=document.getElementById(`admin-panel-link`),{data:{session:i}}=await e.auth.getSession();if(i&&i.user){let a=i.user,o=a.user_metadata?.full_name||a.email,s=a.user_metadata?.role||`customer`;t&&(t.innerHTML=`
            <h6>Hello, ${o}</h6>
            <p class="text-muted small mb-0" style="font-size: 0.75rem; word-break: break-all;">${a.email}</p>
          `),n&&(n.innerHTML=`
            <button id="logout-btn" class="btn btn-outline-danger w-100 py-1.5 fw-bold rounded-3" style="font-size: 0.85rem;">Log Out</button>
          `,document.getElementById(`logout-btn`)?.addEventListener(`click`,async()=>{await e.auth.signOut(),window.location.href=`/`}));let{data:c}=await e.from(`profiles`).select(`role`).eq(`id`,a.id).single(),l=c?.role||s;l===`admin`||l===`super_admin`?r?.classList.remove(`d-none`):r?.classList.add(`d-none`)}else t&&(t.innerHTML=`
            <h6>Welcome Back</h6>
            <p>Log in for a personalized experience</p>
          `),n&&(n.innerHTML=`
            <a href="/login" class="btn btn-primary-action">Log In</a>
            <a href="/register" class="btn btn-outline-action">Register</a>
          `),r?.classList.add(`d-none`)}t(),e.auth.onAuthStateChange(()=>{t()});