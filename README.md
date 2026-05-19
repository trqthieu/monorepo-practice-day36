# Monorepo Practice Project

## Cấu trúc

```
monorepo-practice/
├── services/
│   ├── frontend/    # React app
│   ├── backend/     # Express API
│   └── worker/      # Background jobs
└── README.md
```

## Mục tiêu thực hành

Tạo GitHub Actions workflows để:
1. ❌ Monolith build - build tất cả services mỗi lần commit
2. ✅ Optimized builds - chỉ build service nào có thay đổi

## Hints cho workflows

```yaml
# .github/workflows/frontend.yml
on:
  push:
    paths:
      - 'services/frontend/**'
      - 'package.json'
```

Tự implement và test!
