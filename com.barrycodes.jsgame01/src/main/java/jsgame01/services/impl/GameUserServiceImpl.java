package jsgame01.services.impl;

import jsgame01.domain.GameUser;
import jsgame01.repositories.GameUserRepository;
import jsgame01.services.GameUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
@Service
public class GameUserServiceImpl implements GameUserService {

    @Autowired
    private GameUserRepository repo;

    @Override
    public GameUser getUserById(int id) {
        return repo.findOne(id);
    }

    @Override
    public Iterable<GameUser> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public void saveUser(GameUser u) {
        repo.save(u);
    }

    @Override
    public void deleteUser(int id) {
        repo.delete(id);
    }

    @Override
    public void deleteAllUsers() {
        repo.deleteAll();
    }
}
