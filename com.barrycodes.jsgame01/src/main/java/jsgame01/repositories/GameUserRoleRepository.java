package jsgame01.repositories;

import jsgame01.domain.GameUserRole;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by barrsmit1 on 7/5/2016.
 */
public interface GameUserRoleRepository extends CrudRepository<GameUserRole, Integer> {
    public GameUserRole findByName(String name);
}
