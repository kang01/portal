package org.fwoxford.web.rest.errors;

import org.springframework.security.access.AccessDeniedException;

import java.util.HashMap;
import java.util.Map;

public class InvalidAuthorizationException extends AccessDeniedException {

    public InvalidAuthorizationException(String msg) {
        super(msg);
    }

    public InvalidAuthorizationException(String msg, Throwable t) {
        super(msg, t);
    }
}
