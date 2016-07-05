package jsgame01.services.impl;

import jsgame01.domain.GameInstance;
import jsgame01.repositories.GameInstanceRepository;
import jsgame01.services.GameInstanceService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public class GameInstanceServiceImpl implements GameInstanceService {

    @Autowired
    private GameInstanceRepository repo;

    @Override
    public GameInstance getGameInstanceById(int id) {
        return repo.findOne(id);
    }

    @Override
    public Iterable<GameInstance> getAllGameInstances() {
        return repo.findAll();
    }

    @Override
    public void saveGameInstance(GameInstance g) {
        repo.save(g);
    }

    @Override
    public void deleteGameInstance(int id) {
        repo.delete(id);
    }

    @Override
    public void deleteAllGameInstances() {
        repo.deleteAll();
    }
}
