package com.chekh.repository;

import com.chekh.entity.AdEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends CrudRepository<AdEntity, Long> {
    @Query("FROM AdEntity ad WHERE UPPER(ad.adName) LIKE UPPER(concat('%', :adName, '%'))")
    List<AdEntity> search(@Param("adName") String search, Sort sort);
}