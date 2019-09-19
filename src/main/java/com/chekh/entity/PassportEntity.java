package com.chekh.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "passport", schema = "public", catalog = "advertising_agency")
public class PassportEntity {
    private Long passportId;
    private String fullName;
    private String series;
    private String number;

    @Id
    @Column(name = "passport_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Long getPassportId() {
        return passportId;
    }

    public void setPassportId(Long passportId) {
        this.passportId = passportId;
    }

    @Basic
    @Column(name = "full_name")
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Basic
    @Column(name = "series")
    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    @Basic
    @Column(name = "number")
    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PassportEntity that = (PassportEntity) o;
        return Objects.equals(passportId, that.passportId) &&
                Objects.equals(fullName, that.fullName) &&
                Objects.equals(series, that.series) &&
                Objects.equals(number, that.number);
    }

    @Override
    public int hashCode() {
        int result = passportId != null ? passportId.hashCode() : 0;
        result = 31 * result + (fullName != null ? fullName.hashCode() : 0);
        result = 31 * result + (series != null ? series.hashCode() : 0);
        result = 31 * result + (number != null ? number.hashCode() : 0);
        return result;
    }
}
