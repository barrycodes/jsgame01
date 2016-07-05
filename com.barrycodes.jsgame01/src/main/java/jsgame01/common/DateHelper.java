package jsgame01.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public class DateHelper {


    public static Date getDateFromString(String str) {
        Date result = null;
        if (!StringHelper.isNullOrEmpty(str)) {
            try {
                result = new SimpleDateFormat("yyyy-MM-dd").parse(str);
            } catch (ParseException ex) {
            }
        }
        return result;
    }

    public static String getStringFromDate(Date d) {
        String result = null;
        if (d != null)
            result = new SimpleDateFormat("yyyy-MM-dd").format(d);
        return result;
    }
}
