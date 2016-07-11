package jsgame01.services;

import jsgame01.domain.GameInstance;

import java.util.List;

/**
* Created by barrsmit1 on 7/5/2016.
*/
public interface GameInstanceService {

    public GameInstance getGameInstanceById(int id);

    public Iterable<GameInstance> getAllGameInstances();

    public void saveGameInstance(GameInstance g);

    public void deleteGameInstance(int id);

    public void deleteAllGameInstances();

    public Iterable<GameInstance> getTop10Scores();

    public Iterable<GameInstance> getTop10ScoresToday();

}
