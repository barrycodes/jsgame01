package jsgame01.repositories;

import jsgame01.domain.GameInstance;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;
import java.util.List;

/**
* Created by barrsmit1 on 7/5/2016.
*/
public interface GameInstanceRepository extends PagingAndSortingRepository<GameInstance, Integer> {
//    public Iterable<GameInstance> findByScore(int score);
//    public Iterable<GameInstance> findTop2();
//    public Iterable<GameInstance> find(int score);
//    public Iterable<GameInstance> findTop2OrderByScore();
    public Iterable<GameInstance> findTop10ByDateAfterOrderByScoreDesc(Date start);
}
