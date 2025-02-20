'use client'
import { Button } from '@/components/form-components/Button'
import { FormInput } from '@/components/form-components/FormInput'
import { IncidentSearcher } from '@/components/form-components/IncidentSearcher'
import { Notification } from '@/components/form-components/Notification'
import { HOME_ROUTE } from '@/constants'
import { incidentsMock } from '@/data/incidents'
import { createDocumentSource } from '@/services/documentSources'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function DocumentSourceForm({ onComplete, incidentId }) {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState('')
  const isIncidentSelected = !!getValues().incidentId

  useEffect(() => {
    if (incidentId) {
      setValue('incidentId', incidentId)
    }
  }, [incidentId, setValue])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const response = await createDocumentSource(data)
    if (!response?.ok) {
      setNotification({
        message:
          'Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.',
        type: 'error',
      })
      setIsSubmitting(false)
      return
    }
    setNotification({
      message: 'Testigo registrado correctamente',
      type: 'success',
    })
    setIsSubmitting(false)
    if (onComplete) {
      onComplete() // Llama a onComplete para ir al siguiente paso
      return
    }
    router.push(HOME_ROUTE)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 max-w-3xl mx-auto'
      >
        <IncidentSearcher
          disabled={!!incidentId}
          incidents={incidentsMock}
          error={errors.incidentId?.message}
          watch={watch}
          setValue={setValue}
        />
        {/* Descripción del medio */}
        <FormInput
          disabled={!isIncidentSelected}
          label='Descripción del Medio*'
          {...register('descripcion_medio', {
            required: 'Campo obligatorio',
            maxLength: { value: 250, message: 'Máximo 250 caracteres' },
          })}
          error={errors.descripcion_medio?.message}
        />

        {/* Autor del Medio */}
        <FormInput
          disabled={!isIncidentSelected}
          label='Autor del Medio'
          {...register('autor_medio', {
            maxLength: { value: 200, message: 'Máximo 200 caracteres' },
          })}
          error={errors.autor_medio?.message}
        />

        {/* Fecha de Publicación */}
        <FormInput
          disabled={!isIncidentSelected}
          label='Fecha de Publicación'
          type='date'
          {...register('fecha_publicacion')}
          error={errors.fecha_publicacion?.message}
        />

        {/* URL */}
        <FormInput
          disabled={!isIncidentSelected}
          label='URL'
          {...register('url', {
            maxLength: { value: 250, message: 'Máximo 250 caracteres' },
            pattern: {
              value:
                /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:[0-9]+)?(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/,
              message: 'Formato de URL incorrecto',
            },
          })}
          error={errors.url?.message}
        />

        {/* Botón de envío */}
        <Button
          disabled={isSubmitting || !isIncidentSelected}
          type='submit'
          className='w-full'
        >
          {isSubmitting ? 'Guardando...' : 'Registrar Medio'}
        </Button>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  )
}
