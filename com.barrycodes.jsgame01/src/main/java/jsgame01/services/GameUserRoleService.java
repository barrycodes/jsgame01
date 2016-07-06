package jsgame01.services;

import jsgame01.domain.GameUserRole;

import java.util.List;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public interface GameUserRoleService {

    public GameUserRole getRoleById(int id);

    public GameUserRole getRoleByName(String name);

    public Iterable<GameUserRole> getAllRoles();

    public void saveRole(GameUserRole r);

    public void deleteRole(int id);

    public void deleteAllRoles();

}
