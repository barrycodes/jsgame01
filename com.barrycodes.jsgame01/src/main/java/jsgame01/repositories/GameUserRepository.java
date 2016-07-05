package jsgame01.repositories;

import jsgame01.domain.GameUser;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public interface GameUserRepository extends CrudRepository<GameUser, Integer> {
}
