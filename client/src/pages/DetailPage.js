import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const [link, setLink] = useState(null)
  const { request, loading } = useHttp()
  const linkId = useParams().id

  const getLink = useCallback(async() => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`})
      setLink(fetched)
    } catch (e) {
      
    }
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {
        !loading && link && <LinkCard link={link}></LinkCard>
      }
    </>
  )
}