package com.chekh.repository;

import com.chekh.entity.CheckEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckRepository extends CrudRepository<CheckEntity, Long> {
    @Query("FROM CheckEntity c where concat(c.checkId, '')  LIKE concat('%', :checkId, '%')")
    List<CheckEntity> search(@Param("checkId") String search, Sort sort);
}