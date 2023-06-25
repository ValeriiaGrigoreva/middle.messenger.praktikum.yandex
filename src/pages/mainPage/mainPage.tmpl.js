import './mainPage.scss'

export default `
    <main>
        <div class="grid--container">
            <div class="main-page-content grid--content">
                <div class="grid--block">
                    <h1 class="main-page-header">Вход</h1>

                    <form>
                        {{> input label="Логин" id="login" name="login" type="text" }}
                        {{> input label="Пароль" id="password" name="password" type="password" }}
                    </form>
                </div>

                <div class="main-page-buttons">
                    {{> button class="main-page-auth-button" text="Авторизоваться" background="blue"}}
                    <a class="main-page-account-button" href="registration">
                        {{> button text="Нет аккаунта?" background="none"}}
                    </a>
                </div>
            </div>
        </div>
    </main>
`
