package jsgame01.domain;

import org.hibernate.id.GUIDGenerator;
import org.hibernate.id.UUIDGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Entity
public class GameUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Version
    private Integer version;

    private String username;

    private String password;

    private String userGuid;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private List<GameUserRole> roles;

    public GameUser() {
        roles = new ArrayList<>();
        userGuid = UUID.randomUUID().toString();
    }

    public GameUser(String username) {
        this(username, null);
    }

    public GameUser(String username, String password) {
        this();
        this.username = username;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<GameUserRole> getRoles() {
        return roles;
    }

    public void setRoles(List<GameUserRole> roles) {
        this.roles = roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserGuid() {
        return userGuid;
    }

    public void setUserGuid(String userGuid) {
        this.userGuid = userGuid;
    }
}
