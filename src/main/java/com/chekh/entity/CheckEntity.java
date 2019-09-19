package com.chekh.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "check", schema = "public", catalog = "advertising_agency")
public class CheckEntity {
    private Long checkId;
    private Double price;
    private Integer nds;
    private Integer tax;

    @Id
    @Column(name = "check_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Long getCheckId() {
        return checkId;
    }

    public void setCheckId(Long checkId) {
        this.checkId = checkId;
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
    @Column(name = "nds")
    public Integer getNds() {
        return nds;
    }

    public void setNds(Integer nds) {
        this.nds = nds;
    }

    @Basic
    @Column(name = "tax")
    public Integer getTax() {
        return tax;
    }

    public void setTax(Integer tax) {
        this.tax = tax;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CheckEntity that = (CheckEntity) o;
        return Objects.equals(checkId, that.checkId) &&
                Objects.equals(price, that.price) &&
                Objects.equals(nds, that.nds) &&
                Objects.equals(tax, that.tax);
    }

    @Override
    public int hashCode() {
        int result = checkId != null ? checkId.hashCode() : 0;
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (nds != null ? nds.hashCode() : 0);
        result = 31 * result + (tax != null ? tax.hashCode() : 0);
        return result;
    }
}
