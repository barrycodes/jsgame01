package jsgame01.repositories;

import jsgame01.domain.GameInstance;
import org.springframework.data.repository.CrudRepository;

/**
* Created by barrsmit1 on 7/5/2016.
*/
public interface GameInstanceRepository extends CrudRepository<GameInstance, Integer> {
}
