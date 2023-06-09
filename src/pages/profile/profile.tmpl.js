import './profile.scss'

export default `
    <main>
        <div class="grid--container">
            <div class="profile-content grid--content">
                <div class="grid--block">
                    <div class="profile-photo"></div>
                    <h3 class="color--blue">Иван</h3>
                    <form class="profile-form">
                        {{> input label="Почта" id="email" name="email" type="email" }}
                        {{> input label="Логин" id="login" name="login" type="text" }}
                        {{> input label="Имя" id="first_name" first_name="name" type="text" }}
                        {{> input label="Фамилия" id="second_name" name="second_name" type="text" }}
                        {{> input label="Имя в чате" id="display_name" name="display_name" type="text" }}
                        {{> input label="Телефон" id="phone" name="phone" type="tel" }}
                    </form>

                    <div class="w--full grid--flex grid--flex-column">
                        <div class="grid--flex grid--justify-between">
                            {{> button text="Изменить данные" background="blue"}}
                            {{> button text="Изменить пароль" background="blue"}}
                        </div>
                        {{> button class="profile-exit-button" text="Выйти" background="orange"}}
                    </div>
                </div>
            </div>
        </div>
    </main>
`