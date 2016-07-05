package jsgame01.services;

import jsgame01.domain.GameUser;

import java.util.List;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public interface GameUserService {

    public GameUser getUserById(int id);

    public GameUser getUserByName(String username);

    public GameUser getUserByGuid(String guid);

    public Iterable<GameUser> getAllUsers();

    public void saveUser(GameUser u);

    public void deleteUser(int id);

    public void deleteAllUsers();

}
