package jsgame01.common;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public class UriHelper {

    public static String getBaseUri(HttpServletRequest request) {
        String result = request.getRequestURL().toString();
        result = result.substring(0, result.length() - request.getRequestURI().length());
        return result;
    }

}
