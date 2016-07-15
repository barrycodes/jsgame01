package jsgame01.controllers;

import jsgame01.common.StringHelper;
import jsgame01.domain.GameUser;
import jsgame01.services.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@ControllerAdvice
public final class GlobalController {

    @Autowired
    GameUserService userService;

    public static GameUser getLoggedInUser(GameUserService userService, HttpSession session) {
        GameUser result = null;

        String userGuid = (String)session.getAttribute("loggedInUser");

        if (!StringHelper.isNullOrEmpty(userGuid)) {
            result = userService.getUserByGuid(userGuid);
        }
        return result;
    }

    @ModelAttribute
    public void addAttributes(
            Model model,
            HttpSession session) {
//            @CookieValue(
//                    value = "loggedInUser",
//                    defaultValue = "") String userCookie) {
//        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String name = "notLoggedIn";
//        if(auth != null) {
//            name = auth.getName(); //get logged in username
//        }

        model.addAttribute("gameUser", getLoggedInUser(userService, session));
    }
}
