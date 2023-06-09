import './profile.scss'

export default `
    <main>
        <div class="grid--container">
            <div class="profile-change-password-content grid--content">
                <div class="grid--block">
                    <div class="profile-photo"></div>
                    <h3 class="color--blue">Иван</h3>
                    <form class="profile-form">
                        {{> input label="Старый пароль" id="old_password" name="old_password" type="password" }}
                        {{> input label="Новый пароль" id="new_password" name="new_password" type="password" }}
                        {{> input label="Повторите новый пароль" id="repeat_new_password" name="new_password" type="password" }}
                    </form>
                    {{> button class="profile-exit-button" text="Сохранить" background="blue"}}
                </div>
            </div>
        </div>
    </main>
`