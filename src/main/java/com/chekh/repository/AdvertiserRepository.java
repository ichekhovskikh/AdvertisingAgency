package com.chekh.repository;

import com.chekh.entity.AdvertiserEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvertiserRepository extends CrudRepository<AdvertiserEntity, Long> {
    @Query("FROM AdvertiserEntity advertiser " +
            "WHERE UPPER(advertiser.passport.fullName) LIKE UPPER(concat('%', :fullName, '%'))")
    List<AdvertiserEntity> search(@Param("fullName") String search, Sort sort);
}