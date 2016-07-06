package jsgame01.controllers;

import com.google.gson.Gson;
import jsgame01.common.LogHelper;
import jsgame01.common.PasswordStorage;
import jsgame01.domain.GameUser;
import jsgame01.domain.vo.GameUserVo;
import jsgame01.services.GameUserRoleService;
import jsgame01.services.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Controller
public class IndexController {

    @Autowired
    private GameUserService userService;

    @Autowired
    private GameUserRoleService roleService;

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/about")
    public String about() {
        return "index";
    }

    @RequestMapping(value = "/admin")
    public String admin() {
        return "index";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginGet(Model model) {

        model.addAttribute("gameUserVo", new GameUserVo());

        return "login";
    }

    @RequestMapping(value = "/checkusername", method = RequestMethod.GET)
    public void checkUsername(@RequestParam String username, HttpServletResponse response) {
        GameUser user = userService.getUserByName(username);
        Boolean result = (user == null);

        try {
            response.getWriter().write(new Gson().toJson(result));
        } catch (IOException ex) {
            LogHelper.getLogger().error(ex);
        }
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginPost(GameUserVo gameUserVo, Model model, HttpSession session) throws PasswordStorage.CannotPerformOperationException, PasswordStorage.InvalidHashException {

        String result = "login";

        Object modelObject = null;

        modelObject = gameUserVo;

        if (gameUserVo != null) {
            GameUser foundUser = userService.getUserByName(gameUserVo.getUsername());
            if (foundUser != null) {
                String correctPassword = foundUser.getPassword();
                if (correctPassword != null) {
                    if (PasswordStorage.verifyPassword(gameUserVo.getPassword(), correctPassword)) {
                        setLoggedInCookie(foundUser, session);
                        result = "redirect:/";
                        modelObject = foundUser;
                    }
                }
            }
            else {
                foundUser = new GameUser(gameUserVo.getUsername(), PasswordStorage.createHash(gameUserVo.getPassword()));
                foundUser.getRoles().add(roleService.getRoleByName("player"));
                userService.saveUser(foundUser);
                setLoggedInCookie(foundUser, session);
                result = "redirect:/";
                modelObject = foundUser;
            }
        }
        model.addAttribute("gameUserVo", modelObject);

        return result;

    }

    private void setLoggedInCookie(GameUser user, HttpSession session) {

        session.setAttribute("loggedInUser", user.getUserGuid());
//        response.addCookie(new Cookie("loggedInUser", user.getUserGuid()));
//        response.

    }

    private void clearLoggedInCookie(GameUser user) {

    }

    private GameUser getGameUserFromVo(GameUserVo vo) throws PasswordStorage.CannotPerformOperationException {

        GameUser result = new GameUser(vo.getUsername());
        String hashedPassword = PasswordStorage.createHash(vo.getPassword());
        result.setPassword(hashedPassword);
        result.setId(vo.getId());
        result.setVersion(vo.getVersion());

        return result;
    }

    private GameUserVo getVoFromGameUser(GameUser user) {

        GameUserVo result = new GameUserVo();

        result.setUsername(user.getUsername());
        result.setId(user.getId());
        result.setVersion(user.getVersion());

        return result;
    }
}
