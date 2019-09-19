package com.chekh.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "seller", schema = "public", catalog = "advertising_agency")
public class SellerEntity {
    private Long sellerId;
    private Long passportId;
    private Long phone;
    private String mail;
    private PassportEntity passport;

    @Id
    @Column(name = "seller_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    @Basic
    @Column(name = "passport_id")
    public Long getPassportId() {
        return passportId;
    }

    public void setPassportId(Long passportId) {
        this.passportId = passportId;
    }

    @Basic
    @Column(name = "phone")
    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "mail")
    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SellerEntity that = (SellerEntity) o;
        return Objects.equals(sellerId, that.sellerId) &&
                Objects.equals(passportId, that.passportId) &&
                Objects.equals(phone, that.phone) &&
                Objects.equals(mail, that.mail);
    }

    @Override
    public int hashCode() {
        int result = sellerId != null ? sellerId.hashCode() : 0;
        result = 31 * result + (passportId != null ? passportId.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (mail != null ? mail.hashCode() : 0);
        return result;
    }

    @OneToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "passport_id", nullable = false)
    public PassportEntity getPassport() {
        return passport;
    }

    public void setPassport(PassportEntity passport) {
        this.passport = passport;
    }
}
