package app.models.authentication;

import app.models.CoreModel;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Created by carreath on 2017-08-10.
 */
@Entity
@Table(
    uniqueConstraints = {@UniqueConstraint(columnNames = {"id", "userName"})}
)
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    public Long getId() {
        return id;
    }

    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Long entityId;

    @NotNull
    private String userName;

    @JsonIgnore
    private String authToken;

    @Transient
    private String password;

    public User() {

    }

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
        this.authToken = "ImHashed:" + password;
    }

    public String getUserName() {
        return userName;
    }
    public String getAuthToken() {
        return authToken;
    }
}