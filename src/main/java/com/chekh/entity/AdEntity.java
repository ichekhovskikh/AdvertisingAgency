package com.chekh.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "ad", schema = "public", catalog = "advertising_agency")
public class AdEntity {
    private Long adId;
    private String adName;
    private Double price;
    private Integer duration;

    @Id
    @Column(name = "ad_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getAdId() {
        return adId;
    }

    public void setAdId(Long adId) {
        this.adId = adId;
    }

    @Basic
    @Column(name = "ad_name")
    public String getAdName() {
        return adName;
    }

    public void setAdName(String adName) {
        this.adName = adName;
    }

    @Basic
    @Column(name = "price")
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Basic
    @Column(name = "duration")
    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AdEntity that = (AdEntity) o;
        return Objects.equals(adId, that.adId) &&
                Objects.equals(adName, that.adName) &&
                Objects.equals(price, that.price) &&
                Objects.equals(duration, that.duration);
    }

    @Override
    public int hashCode() {
        int result = adId != null ? adId.hashCode() : 0;
        result = 31 * result + (adName != null ? adName.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (duration != null ? duration.hashCode() : 0);
        return result;
    }
}
