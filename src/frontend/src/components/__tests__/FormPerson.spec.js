/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FormPerson from '../forms/FormPerson.vue'
import FormInput from '../FormInput.vue';
import FormButton from '../FormButton.vue';

describe('FormPerson - Pessoa fisica', () => {
  const wrapperPF = mount(FormPerson, {
    global: {
      components: {
        FormInput,
        FormButton
      }
    },
    props: {
      modelValue: {
        legal_nature: "pf"
      }
    }
  });
  it('should validate fields empty', async () => {
    await wrapperPF.find('form').trigger('submit');
    const visible_messages = [
      'Digite um nome válido',
      'Digite um CPF válido',
      'Digite uma data de nascimento válida',
      'Digite um telefone válido. Ex: (99) 999999999'
    ].filter(message => wrapperPF.text().indexOf(message) > -1);
    expect(visible_messages.length).toBe(4);
  })

  it('should validate CPF is valid', async () => {
    await wrapperPF.find('#name').setValue('Frontend Dev tester');
    await wrapperPF.find('#birth_date').setValue('14041995');
    await wrapperPF.find('#document').setValue('0378585053');
    await wrapperPF.find('#phone').setValue('75981535971');
    await wrapperPF.find('form').trigger('submit');
    expect(wrapperPF.html()).toContain('Digite um CPF válido');
  })

  it('should validate date field is valid', async () => {
    await wrapperPF.find('#name').setValue('Frontend Dev tester');
    await wrapperPF.find('#birth_date').setValue('14241995');
    await wrapperPF.find('#document').setValue('03785850530');
    await wrapperPF.find('#phone').setValue('75981535971');
    await wrapperPF.find('form').trigger('submit');
    expect(wrapperPF.html()).toContain('Digite uma data de nascimento válida');
  })

  it('should validate phone is valid', async () => {
    await wrapperPF.find('#name').setValue('Frontend Dev tester');
    await wrapperPF.find('#birth_date').setValue('14041995');
    await wrapperPF.find('#document').setValue('03785850530');
    await wrapperPF.find('#phone').setValue('7598153');
    await wrapperPF.find('form').trigger('submit');
    expect(wrapperPF.html()).toContain('Digite um telefone válido. Ex: (99) 999999999');
  })
})

describe('FormPerson - Pessoa juridica', () => {
  const wrapperPJ = mount(FormPerson, {
    global: {
      components: {
        FormInput,
        FormButton
      }
    },
    props: {
      modelValue: {
        legal_nature: "pj"
      }
    }
  });
  it('should validate fields empty', async () => {
    await wrapperPJ.find('form').trigger('submit');
    const visible_messages = [
      'Digite uma razão social válida',
      'Digite um CNPJ válido',
      'Digite uma data de abertura válida',
      'Digite um telefone válido. Ex: (99) 999999999'
    ].filter(message => wrapperPJ.text().indexOf(message) > -1);
    expect(visible_messages.length).toBe(4);
  })

  it('should validate CNPJ is valid', async () => {
    await wrapperPJ.find('#name').setValue('Frontend Dev tester');
    await wrapperPJ.find('#birth_date').setValue('14041995');
    await wrapperPJ.find('#document').setValue('182134340001');
    await wrapperPJ.find('#phone').setValue('75981535971');
    await wrapperPJ.find('form').trigger('submit');
    expect(wrapperPJ.html()).toContain('Digite um CNPJ válido');
  })

  it('should validate date field is valid', async () => {
    await wrapperPJ.find('#name').setValue('Frontend Dev tester');
    await wrapperPJ.find('#birth_date').setValue('14241995');
    await wrapperPJ.find('#document').setValue('18213434000135');
    await wrapperPJ.find('#phone').setValue('75981535971');
    await wrapperPJ.find('form').trigger('submit');
    expect(wrapperPJ.html()).toContain('Digite uma data de abertura válida');
  })

  it('should validate phone is valid', async () => {
    await wrapperPJ.find('#name').setValue('Frontend Dev tester');
    await wrapperPJ.find('#birth_date').setValue('14041995');
    await wrapperPJ.find('#document').setValue('18213434000135');
    await wrapperPJ.find('#phone').setValue('7598153');
    await wrapperPJ.find('form').trigger('submit');
    expect(wrapperPJ.html()).toContain('Digite um telefone válido. Ex: (99) 999999999');
  })
})

