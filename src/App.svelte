<!-- <script>
  import router from 'page'
  import PageHome from './PageHome.svelte'
  import PageLogin from './PageLogin.svelte'
  import PageCRUD from './PageCRUD.svelte'

  let page = PageHome
  function isAuthenticate() {
    let token = localStorage.getItem('authToken');
    return !!token
  }
  function authMiddleware(routeHandler) {
    return () => {
      if (isAuthenticate()) {
        routeHandler();
      } else {
        window.location.href = '/login';
      }
    }
  }

  router('/', ()=>{page = PageHome})
  router('/login', ()=>{page = PageLogin})
  router('/prefix', authMiddleware(()=>{page = PageCRUD}))
  router.start()
</script>

<svelte:component this={page} /> -->
<script>
  import router from 'page';
  import PageHome from './PageHome.svelte';
  import PageLogin from './PageLogin.svelte';
  import PageCRUD from './PageCRUD.svelte';

  let page = PageHome;

  function isAuthenticate() {
    return !!localStorage.getItem('authToken');
  }

  function authMiddleware(routeHandler) {
    return () => {
      if (isAuthenticate()) {
        routeHandler();
      } else {
        router.redirect('/login');
      }
    };
  }

  router('/', () => { page = PageHome; });
  router('/login', () => { page = PageLogin; });
  router('/prefix', authMiddleware(() => { page = PageCRUD; }));

  router.start();
</script>

<svelte:component this={page} />
