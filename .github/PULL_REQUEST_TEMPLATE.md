## 📋 Pull Request Checklist

### Verificaciones Automáticas

Este PR será verificado automáticamente por nuestro sistema de CI/CD:

- [ ] **ESLint**: Análisis de calidad de código
- [ ] **Prettier**: Verificación de formato de código
- [ ] **Tests unitarios**: Todos los tests deben pasar
- [ ] **Build**: El proyecto debe compilar sin errores
- [ ] **Tests E2E**: Cypress tests deben ejecutarse exitosamente

### 📝 Descripción

<!-- Describe los cambios realizados en este PR -->

### 🔧 Tipo de Cambio

- [ ] Bug fix (cambio no-breaking que arregla un issue)
- [ ] Nueva feature (cambio no-breaking que añade funcionalidad)
- [ ] Breaking change (fix o feature que causa cambios en funcionalidad existente)
- [ ] Documentación
- [ ] Refactoring
- [ ] Tests

### 🧪 Testing

- [ ] He ejecutado `npm run check-all` localmente
- [ ] He añadido tests para cubrir mis cambios
- [ ] Todos los tests existentes pasan

### 📚 Documentación

- [ ] He actualizado la documentación según sea necesario
- [ ] Los comentarios de código están actualizados

---

### Scripts para Verificación Local

```bash
# Ejecutar todas las verificaciones
npm run check-all

# Verificaciones individuales
npm run lint
npm run format:check
npm run test
npm run build
```

Los checks automáticos se ejecutarán cuando se abra/actualice este PR. Puedes ver el estado en la pestaña "Checks" arriba.
