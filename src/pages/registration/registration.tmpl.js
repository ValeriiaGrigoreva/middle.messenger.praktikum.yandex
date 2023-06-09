import './registration.scss'

export default `
    <main>
        <div class="grid--container">
            <div class="registration-content grid--content">
                <div class="grid--block">
                    <h1 class="registration-header">Регистрация</h1>

                    <form>
                        {{> input label="Почта" id="email" name="email" type="email" }}
                        {{> input label="Логин" id="login" name="login" type="text" }}
                        {{> input label="Имя" id="first_name" first_name="name" type="text" }}
                        {{> input label="Фамилия" id="second_name" name="second_name" type="text" }}
                        {{> input label="Телефон" id="phone" name="phone" type="tel" }}
                        {{> input label="Пароль" id="password" name="password" type="password" }}
                        {{> input label="Пароль (еще раз)" id="password_repeat" name="password" type="password" }}
                    </form>
                </div>

                <div class="registration-buttons">
                    {{> button class="registration-auth-button" text="Зарегистрироваться" background="blue"}}
                    <a class="registration-account-button" href="/chats">
                        {{> button text="Войти" background="none"}}
                    </a>
                </div>
            </div>
        </div>
    </main>
`