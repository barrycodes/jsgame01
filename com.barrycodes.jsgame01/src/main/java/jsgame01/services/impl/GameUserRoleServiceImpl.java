package jsgame01.services.impl;

import jsgame01.domain.GameUserRole;
import jsgame01.repositories.GameUserRoleRepository;
import jsgame01.services.GameUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Service
public class GameUserRoleServiceImpl implements GameUserRoleService {

    @Autowired
    private GameUserRoleRepository repo;

    @Override
    public GameUserRole getRoleById(int id) {
        return repo.findOne(id);
    }

    @Override
    public Iterable<GameUserRole> getAllRoles() {
        return repo.findAll();
    }

    @Override
    public void saveRole(GameUserRole r) {
        repo.save(r);
    }

    @Override
    public void deleteRole(int id) {
        repo.delete(id);
    }

    @Override
    public GameUserRole getRoleByName(String name) {
        return repo.findByName(name);
    }

    @Override
    public void deleteAllRoles() {
        repo.deleteAll();
    }
}
