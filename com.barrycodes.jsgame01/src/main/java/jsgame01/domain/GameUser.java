package jsgame01.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<GameUserRole> roles;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<GameInstance> games;

    public GameUser() {
        roles = new ArrayList<>();
        games = new ArrayList<>();
    }

    public GameUser(String username) {
        this();
        this.username = username;
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

    public List<GameInstance> getGames() {
        return games;
    }

    public void setGames(List<GameInstance> games) {
        this.games = games;
    }
}
