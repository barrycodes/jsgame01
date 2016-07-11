package jsgame01.services.impl;

import jsgame01.domain.GameInstance;
import jsgame01.repositories.GameInstanceRepository;
import jsgame01.services.GameInstanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

/**
* Created by barrsmit1 on 7/5/2016.
*/
@Service
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

    @Override
    public Iterable<GameInstance> getTop10Scores() {
        Page<GameInstance> games = repo.findAll(new PageRequest(0, 10, Sort.Direction.DESC, "score"));
        List<GameInstance> results = new ArrayList<>();
        for (GameInstance g : games)
            results.add(g);
        return results;
    }

    @Override
    public Iterable<GameInstance> getTop10ScoresToday() {
        // today
        Calendar date = new GregorianCalendar();
// reset hour, minutes, seconds and millis
        date.set(Calendar.HOUR_OF_DAY, 0);
        date.set(Calendar.MINUTE, 0);
        date.set(Calendar.SECOND, 0);
        date.set(Calendar.MILLISECOND, 0);

        return repo.findTop10ByDateAfterOrderByScoreDesc(date.getTime());
//        return repo.findTop10ByDateAfter(date.getTime());
    }
}
