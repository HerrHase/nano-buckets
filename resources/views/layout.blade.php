<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nano Buckets</title>

        @yield('head')

        <link rel="stylesheet" href="css/app.css" />
    </head>
    <body>
        <header class="app-header">
            <div class="container is-fluid pt-2 pb-2">
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/">
                            <img class="app-header__logo" src="/logo.svg" alt="Urban Filehub" />
                            <span class="app-header__title ml-2">
                                Filehub<strong>.Freifunk Minden</strong>
                            </span>
                        </a>
                    </div>
                    <div class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item">
                                Dashboard
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        <section class="section">
            <div class="container is-fluid mt-3 mb-4">
                <urban-accordion>
                    <div title="Send me a Link">
                        <urban-login-email></urban-login-email>
                    </div>
                    <div title="Login with Password">
                        <urban-login-password></urban-login-password>
                    </div>
                </urban-accordion>
            </div>
        </section>

        <main>
            @yield('main')
        </main>

        <script type="text/javascript" src="js/app.js"></script>
        @stack('scripts')
    </body>
</html>