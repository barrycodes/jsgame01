package jsgame01.controllers;

import jsgame01.domain.GameInstance;
import jsgame01.domain.GameUser;
import jsgame01.services.GameInstanceService;
import jsgame01.services.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import java.util.Date;

/**
 * Created by barrsmit1 on 7/13/2016.
 */
@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    GameInstanceService gameService;

    @Autowired
    GameUserService userService;

    @RequestMapping(value = "/storescore/{score}", method= RequestMethod.POST)
    public Object storeGameInstance(@PathVariable int score, HttpSession session) {
//        GameUser user = null;
        GameUser user = GlobalController.getLoggedInUser(userService, session);
        if (user != null) {
            GameInstance game = new GameInstance();
            game.setDate(new Date());
            game.setUser(user);
            game.setScore(score);
            gameService.saveGameInstance(game);
        }
        return "OK";
    }

}
