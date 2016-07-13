package jsgame01.bootstrap;

import jsgame01.common.LogHelper;
import jsgame01.common.PasswordStorage;
import jsgame01.domain.GameInstance;
import jsgame01.domain.GameUser;
import jsgame01.domain.GameUserRole;
import jsgame01.services.GameInstanceService;
import jsgame01.services.GameUserRoleService;
import jsgame01.services.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Component
public class SeedData implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private GameInstanceService gameService;

    @Autowired
    private GameUserService userService;

    @Autowired
    private GameUserRoleService roleService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
//        seedData();
    }

    private void seedData() {
        GameUserRole role1 = new GameUserRole("admin");
        GameUserRole role2 = new GameUserRole("player");

        roleService.saveRole(role1);
        roleService.saveRole(role2);

        GameUser user1 = null;
        GameUser user2 = null;
        try {
            user1 = new GameUser("Barry", PasswordStorage.createHash("pass123"));
            user2 = new GameUser("Buzz", PasswordStorage.createHash("pass123"));
        } catch (Exception ex) {
            LogHelper.getLogger().error(ex);
        }

        user1.getRoles().add(role1);
        user1.getRoles().add(role2);

        user2.getRoles().add(role2);

        userService.saveUser(user1);
        userService.saveUser(user2);

        GameInstance game1 = new GameInstance(user1, new Date(), 10);
        GameInstance game2 = new GameInstance(user1, new Date(), 5000);
        GameInstance game3 = new GameInstance(user1, new Date(), 10000);
        GameInstance game4 = new GameInstance(user1, new Date(), 2000);
        GameInstance game5 = new GameInstance(user2, new Date(), 2000);

        gameService.saveGameInstance(game1);
        gameService.saveGameInstance(game2);
        gameService.saveGameInstance(game3);
        gameService.saveGameInstance(game4);
        gameService.saveGameInstance(game5);
    }
}
