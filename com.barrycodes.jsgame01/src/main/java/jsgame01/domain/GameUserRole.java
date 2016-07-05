package jsgame01.domain;

import javax.persistence.*;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Entity
public class GameUserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Version
    private Integer version;

}
