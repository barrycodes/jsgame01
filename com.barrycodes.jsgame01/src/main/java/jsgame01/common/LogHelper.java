package jsgame01.common;

import org.apache.log4j.Logger;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public class LogHelper {

    private static Logger logger = Logger.getLogger(LogHelper.class);

    public static Logger getLogger() {
        return logger;
    }

    private static void setLogger(Logger logger) {
        logger = logger;
    }

}
