import { useForm } from '@tanstack/react-form'

import { Send } from 'lucide-react'
import { toast } from 'sonner'

import { usePageTranslation } from '@/lib/hooks'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
  Spinner
} from '../ui'
import { createContactSchema } from './contact.schema'
import { useContactMe } from './contact.service'

const ContactForm = () => {
  const { t } = usePageTranslation('forms')

  const formSchema = createContactSchema(t)

  const contactMeMutation = useContactMe({
    onSuccess: () => {
      toast.success(t('contact.notifications.success.title'), {
        description: t('contact.notifications.success.description')
      })
      form.reset()
    },
    onError: (error) => {
      toast.warning(t('contact.notifications.warning.title'), {
        description: t('contact.notifications.warning.description')
      })
      console.error('Failed to send email:', error)
    }
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: ({ value }) => {
      try {
        contactMeMutation.mutate(value)
      } catch (error) {
        toast.error(t('contact.notifications.error.title'), {
          description: t('contact.notifications.error.description')
        })
        console.error('Unexpected error:', error)
      }
    }
  })

  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle id="contact-form-title">{t('contact.title')}</CardTitle>
        <CardDescription id="contact-form-description">{t('contact.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="contact-form"
          aria-labelledby="contact-form-title"
          aria-describedby="contact-form-description"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}>
          <FieldGroup role="group" aria-label={t('contact.form_fields_aria')}>
            <Field className="gap-3 flex-col sm:flex-row" orientation="horizontal">
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  const errorId = `${field.name}-error`
                  const helpId = `${field.name}-help`

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>{t('contact.fields.name.label')}</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        aria-describedby={isInvalid ? `${helpId} ${errorId}` : helpId}
                        aria-required="true"
                        placeholder={t('contact.fields.name.placeholder')}
                        autoComplete="name"
                        required
                      />
                      <div id={helpId} className="sr-only max-w-full">
                        {t('contact.fields.name.help_text')}
                      </div>
                      {isInvalid && (
                        <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  const errorId = `${field.name}-error`
                  const helpId = `${field.name}-help`

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        {t('contact.fields.email.label')}
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        aria-describedby={isInvalid ? `${helpId} ${errorId}` : helpId}
                        aria-required="true"
                        placeholder={t('contact.fields.email.placeholder')}
                        autoComplete="email"
                        required
                      />
                      <div id={helpId} className="sr-only max-w-full">
                        {t('contact.fields.email.help_text')}
                      </div>
                      {isInvalid && (
                        <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                      )}
                    </Field>
                  )
                }}
              />
            </Field>
            <form.Field
              name="subject"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                const errorId = `${field.name}-error`
                const helpId = `${field.name}-help`

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {t('contact.fields.subject.label')}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? `${helpId} ${errorId}` : helpId}
                      aria-required="true"
                      placeholder={t('contact.fields.subject.placeholder')}
                      autoComplete="off"
                      required
                    />
                    <div id={helpId} className="sr-only max-w-full">
                      {t('contact.fields.subject.help_text')}
                    </div>
                    {isInvalid && (
                      <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="message"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                const errorId = `${field.name}-error`
                const helpId = `${field.name}-help`
                const charCountId = `${field.name}-char-count`

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {t('contact.fields.message.label')}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t('contact.fields.message.placeholder')}
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={isInvalid}
                        aria-describedby={
                          isInvalid
                            ? `${helpId} ${charCountId} ${errorId}`
                            : `${helpId} ${charCountId}`
                        }
                        aria-required="true"
                        maxLength={600}
                        required
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText
                          id={charCountId}
                          className="tabular-nums"
                          aria-live="polite"
                          aria-label={t('contact.fields.message.character_count_aria', {
                            count: field.state.value.length,
                            max: 600
                          })}>
                          {t('contact.fields.message.character_count', {
                            count: field.state.value.length
                          })}
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <div id={helpId} className="sr-only max-w-full">
                      {t('contact.fields.message.help_text')}
                    </div>
                    {isInvalid && (
                      <FieldError id={errorId} errors={field.state.meta.errors} role="alert" />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          form="contact-form"
          disabled={contactMeMutation.isPending}
          aria-describedby="submit-button-help">
          {contactMeMutation.isPending ? (
            <>
              {t('contact.submitting_button')}
              <Spinner />
            </>
          ) : (
            <>
              {t('contact.submit_button')}
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <div id="submit-button-help" className="sr-only max-w-full">
          {t('contact.submit_button_help')}
        </div>
      </CardFooter>
    </Card>
  )
}

export { ContactForm }
