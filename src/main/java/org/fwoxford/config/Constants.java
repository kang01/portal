package org.fwoxford.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";
    public static final String DEFAULT_LANGUAGE = "zh-cn";
    //注册来源：102 陌生人登录时创建的
    public static final String REGISTER_SOURCE_STRANGER = "102";
    private Constants() {
    }

}
