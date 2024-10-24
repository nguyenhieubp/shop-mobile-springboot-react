package com.example.shopmobile.Contact;

import java.util.UUID;

public interface ContactActions {

    UUID getId();
    void setId(UUID id);

    String getName();
    void setName(String name);

    String getEmail();
    void setEmail(String email);

    String getSubject();
    void setSubject(String subject);

    String getMessage();
    void setMessage(String message);

    boolean isRemember();
    void setRemember(boolean remember);

}
