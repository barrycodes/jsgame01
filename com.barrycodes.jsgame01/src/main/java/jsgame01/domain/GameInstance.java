package jsgame01.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
* Created by barrsmit1 on 7/5/2016.
*/
@Entity
public class GameInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Version
    private Integer version;

    private Date date;

    private Integer score;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private GameUser user;

    public GameInstance() { }

    public GameInstance(GameUser user, Date date, Integer score) {
        this.user = user;
        this.date = date;
        this.score = score;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public GameUser getUser() {
        return user;
    }

    public void setUser(GameUser user) {
        this.user = user;
    }
}
