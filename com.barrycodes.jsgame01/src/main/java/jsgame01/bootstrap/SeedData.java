package jsgame01.bootstrap;

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
        seedData();
    }

    private void seedData() {
        GameInstance game1 = new GameInstance(new Date(), 1000);
        GameInstance game2 = new GameInstance(new Date(), 5000);
        GameInstance game3 = new GameInstance(new Date(), 10000);
        GameInstance game4 = new GameInstance(new Date(), 2000);
        GameInstance game5 = new GameInstance(new Date(), 2000);

        GameUserRole role1 = new GameUserRole("admin");
        GameUserRole role2 = new GameUserRole("player");

        GameUser user1 = new GameUser("Barry");
        GameUser user2 = new GameUser("Buzz");

        user1.getRoles().add(role1);
        user1.getRoles().add(role2);

        user2.getRoles().add(role2);

        user1.getGames().add(game1);
        user1.getGames().add(game2);
        user1.getGames().add(game3);
        user1.getGames().add(game4);

        user2.getGames().add(game5);

        userService.saveUser(user1);
        userService.saveUser(user2);
    }
}
