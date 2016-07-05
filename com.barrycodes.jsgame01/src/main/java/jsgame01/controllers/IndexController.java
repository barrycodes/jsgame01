package jsgame01.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Controller
public class IndexController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

}
